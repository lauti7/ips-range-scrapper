# ips-range-scrapper
ips-range-scrapper works with a keyword given. It checks keyword against [https://ipinfo.io/countries/us/](https://ipinfo.io/countries/us/) and re-scrape matched links.

Keyword Example: "Verizon Wireless". 
A matched link would be: [https://ipinfo.io/AS6167](https://ipinfo.io/AS6167)

## Run Script
```bash
git clone https://github.com/lauti7/ips-range-scrapper.git

cd ips-range-scrapper

npm install

node index.js
```

Then, IPs are saved in ```ips_range.txt```.