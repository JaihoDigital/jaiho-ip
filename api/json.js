export default function handler(request, response) {
  // enable CORS so other websites can use your API
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  // Detect IP
  const forwarded = request.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0] : request.socket.remoteAddress;

  // Detect basic Geo headers provided by Vercel (if available)
  const city = request.headers['x-vercel-ip-city'] || 'Unknown';
  const region = request.headers['x-vercel-ip-country-region'] || 'Unknown';
  const country = request.headers['x-vercel-ip-country'] || 'Unknown';

  // Return the JSON
  response.status(200).json({
    ip: ip,
    location: {
      city: decodeURIComponent(city),
      region: decodeURIComponent(region),
      country: country
    },
    user_agent: request.headers['user-agent'],
    success: true,
    message: "Data provided by Jaiho IP API"
  });
}