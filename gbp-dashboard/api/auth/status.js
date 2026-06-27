export default function handler(_request, response) {
  response.status(200).json({
    configured: false,
    missingKeys: ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET']
  });
}
