export default async function handler(request, response) {
  // 1. Enable CORS (Allows others to use your API)
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  // 2. Detect IP Address
  const forwarded = request.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0] : request.socket.remoteAddress;

  // 3. Parse User Agent for Browser & OS
  const ua = request.headers['user-agent'] || '';
  const browserInfo = parseUserAgent(ua);

  // 4. Get ISP and precise Location from external source
  // We fetch this server-side so your user doesn't have to.
  let ispData = {};
  try {
    const ispResponse = await fetch(`https://ipwho.is/${ip}`);
    const data = await ispResponse.json();
    if (data.success) {
      ispData = {
        isp: data.connection?.isp || data.isp || "Unknown",
        org: data.connection?.org || data.org || "Unknown",
        city: data.city,
        region: data.region,
        country: data.country,
        flag: data.flag?.img
      };
    }
  } catch (e) {
    console.error("ISP Fetch Failed", e);
  }

  // 5. Build the Final JSON Response
  // We prioritize the external data (more accurate) over Vercel headers
  response.status(200).json({
    ip: ip,
    success: true,
    type: "IPv4",
    location: {
      city: ispData.city || request.headers['x-vercel-ip-city'] || 'Unknown',
      region: ispData.region || request.headers['x-vercel-ip-country-region'] || 'Unknown',
      country: ispData.country || request.headers['x-vercel-ip-country'] || 'Unknown',
      flag: ispData.flag || null
    },
    isp: {
      name: ispData.isp || 'Unknown',
      org: ispData.org || 'Unknown'
    },
    client: {
      browser: browserInfo.browser,
      os: browserInfo.os,
      user_agent: ua
    },
    message: "Data provided by Jaiho IP API"
  });
}

// Helper function to detect Browser and OS from the User-Agent string
function parseUserAgent(ua) {
  let browser = "Unknown";
  let os = "Unknown";

  // Detect Browser
  if (ua.includes("Edg/")) browser = "Microsoft Edge";
  else if (ua.includes("Chrome") && !ua.includes("Chromium")) browser = "Google Chrome";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Apple Safari";
  else if (ua.includes("Firefox")) browser = "Mozilla Firefox";
  else if (ua.includes("curl")) browser = "cURL (Command Line)";
  else if (ua.includes("Postman")) browser = "Postman";
  else if (ua.includes("python-requests")) browser = "Python Requests";

  // Detect OS
  if (ua.includes("Win")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

  return { browser, os };
}