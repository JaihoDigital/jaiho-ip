# What's My IP? - Privacy-First IP Detection Tool

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-live-success.svg)
![Privacy](https://img.shields.io/badge/privacy-focused-green.svg)

**What's My IP?** is a lightweight, open-source utility that allows users to check their public IP address, geolocation, ISP, and device information instantly. 

It includes a **free JSON API** for developers to integrate IP detection into their own applications. Developed by **Jaiho TechServe** (Jaiho Digital), this project focuses on speed, accuracy, and absolute user privacy.

🔗 **Live Demo:** [https://jaiho-ip.vercel.app](https://jaiho-ip.vercel.app)

---

## 🚀 Key Features

* **Instant Detection:** Shows IPv4 address, City, Region, Country, and ISP.
* **Device Fingerprinting:** Detects Browser (e.g., Chrome, Safari) and OS (e.g., Windows, macOS).
* **Developer API:** A fast, CORS-enabled JSON endpoint for programmatic access.
* **Privacy Focused:** **No database.** We do not store, log, or sell user IP data.
* **Responsive Design:** Works perfectly on desktops, tablets, and mobile devices.
* **Dark Mode:** Built-in theme switcher with local storage persistence.

---

## 🛠️ API Documentation

Developers can use our free API to fetch IP details. No API key is required.

**Endpoint:** `GET /api/json`

### Example Response
```json
{
  "ip": "203.0.113.195",
  "success": true,
  "type": "IPv4",
  "location": {
    "city": "Mountain View",
    "region": "California",
    "country": "United States",
    "flag": "[https://cdn.ipwhois.io/flags/us.svg](https://cdn.ipwhois.io/flags/us.svg)"
  },
  "isp": {
    "name": "Google LLC",
    "org": "Google Fiber"
  },
  "client": {
    "browser": "Google Chrome",
    "os": "Windows",
    "user_agent": "Mozilla/5.0..."
  },
  "message": "Data provided by Jaiho IP API"
}
```

### Usage Examples
#### JavaScript (Fetch):
```
fetch('[https://jaiho-ip.vercel.app/api/json](https://jaiho-ip.vercel.app/api/json)')
  .then(res => res.json())
  .then(data => console.log(data.ip, data.location.city));
```
#### Python:
```
import requests
data = requests.get('[https://jaiho-ip.vercel.app/api/json').json](https://jaiho-ip.vercel.app/api/json').json)()
print(f"IP: {data['ip']}, ISP: {data['isp']['name']}")
```

### 💻 Tech Stack
- **Frontend:** HTML5, CSS3 (Custom Variables), Vanilla JavaScript.
- **Backend:** Vercel Serverless Functions (Node.js).
- **External Data:** Integrates with ipwho.is for geolocation data.

### 🔒 Privacy Policy
We believe in **Privacy by Design.**
- **No Logging:** We do not save your IP address or browsing history in any database.
- **No Selling:** Your data is never sold to third-party advertisers.
- **Transient Processing:** Data is processed momentarily in memory to display it to you, then discarded.

Full policy available at: privacy.html

### 🤝 Contributing
Contributions are welcome! If you have suggestions for improvements, please fork the repo and create a pull request.
1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

### 📄 License
Distributed under the MIT License. See LICENSE for more information.

### ❤️ Credits
Developed with ❤️ by Arshvir at Jaiho TechServe.
- **Parent Company:** Jaiho Digital
- **Developer Company:** Jaiho TechServe
- **R&D Company:** Jaiho Labs
- **Email:** jaihodigital@gmail.com

*If you find this project useful, please consider starring the repository!* ⭐
