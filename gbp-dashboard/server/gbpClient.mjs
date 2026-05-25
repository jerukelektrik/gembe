export function createGbpClient(token) {
  async function googleFetch(url) {
    const response = await fetch(url, { headers: { authorization: `Bearer ${token.access_token}` } });
    if (!response.ok) throw new Error(`Google API request failed ${response.status}: ${url}`);
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
