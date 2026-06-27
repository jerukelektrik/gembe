export default function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  response.status(200).json({
    ok: true,
    syncedAt: new Date().toISOString(),
    note: 'Vercel demo sync uses deterministic dummy data. Configure Google OAuth and server integration before live sync.'
  });
}
