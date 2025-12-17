import requests

response = requests.get('https://jaiho-ip.vercel.app/api/json')
data = response.json()

print(f"IP Address: {data['ip']}")
print(f"Country: {data['location']['country']}")