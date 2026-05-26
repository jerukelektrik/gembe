export class GoogleApiError extends Error {
  constructor({ status, url, message, details }) {
    super(message);
    this.name = 'GoogleApiError';
    this.status = status;
    this.url = url;
    this.details = details;
  }
}

function describeGoogleApiError(status, url, details) {
  const detailMessage = details?.error?.message || details?.message;
  if (status === 429) {
    return [
      `Google API quota/access error (429) at ${url}.`,
      'If this Google Cloud project has 0 QPM quota for Business Profile APIs, it has not been approved for GBP API access yet.',
      'Check Google Cloud Console > APIs & Services > Enabled APIs & Services > My Business Account Management API > Quotas, or submit the Business Profile API Application for Basic API Access.',
      detailMessage ? `Google detail: ${detailMessage}` : ''
    ].filter(Boolean).join(' ');
  }

  if (status === 403) {
    return [
      `Google API permission error (403) at ${url}.`,
      'Confirm the API is enabled, the signed-in Google account owns or manages the Business Profiles, and Google Business Profile is enabled for the Workspace account.',
      detailMessage ? `Google detail: ${detailMessage}` : ''
    ].filter(Boolean).join(' ');
  }

  return [`Google API request failed ${status}: ${url}`, detailMessage ? `Google detail: ${detailMessage}` : ''].filter(Boolean).join(' ');
}

export function createGbpClient(token) {
  async function googleFetch(url) {
    const response = await fetch(url, { headers: { authorization: `Bearer ${token.access_token}` } });
    if (!response.ok) {
      const text = await response.text();
      let details = null;
      try {
        details = text ? JSON.parse(text) : null;
      } catch {
        details = { message: text };
      }

      throw new GoogleApiError({
        status: response.status,
        url,
        details,
        message: describeGoogleApiError(response.status, url, details)
      });
    }
    return response.json();
  }

  return {
    async listAccounts() {
      const json = await googleFetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts');
      return json.accounts || [];
    },

    async listLocations(accountName) {
      const readMask = 'name,title,storeCode,metadata,storefrontAddress,openInfo';
      const json = await googleFetch(`https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=${encodeURIComponent(readMask)}&pageSize=100`);
      return json.locations || [];
    },

    async fetchPerformance(locationName, startDate, endDate) {
      const locationId = locationName.split('/').at(-1);
      const metrics = ['WEBSITE_CLICKS', 'CALL_CLICKS', 'BUSINESS_DIRECTION_REQUESTS'];
      const params = new URLSearchParams({
        dailyMetrics: metrics.join(','),
        'dailyRange.startDate.year': String(startDate.year),
        'dailyRange.startDate.month': String(startDate.month),
        'dailyRange.startDate.day': String(startDate.day),
        'dailyRange.endDate.year': String(endDate.year),
        'dailyRange.endDate.month': String(endDate.month),
        'dailyRange.endDate.day': String(endDate.day)
      });
      return googleFetch(`https://businessprofileperformance.googleapis.com/v1/locations/${locationId}:fetchMultiDailyMetricsTimeSeries?${params.toString()}`);
    },

    async listReviews(accountName, locationName) {
      const accountId = accountName.split('/').at(-1);
      const locationId = locationName.split('/').at(-1);
      return googleFetch(`https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews?pageSize=50`);
    }
  };
}
