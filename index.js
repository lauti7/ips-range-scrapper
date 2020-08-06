const request = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');

const url = 'https://ipinfo.io/countries/us';
const base = 'https://ipinfo.io';

//tr Childrens = 7. [0] = /n, [1] = <a>, [2] = /n, [3] = keyword, [4] = /n, [5] = num ips, [6] = /n
// Max Pages 12

const args = process.argv.slice(2);

var keyword = args.length > 1 ? `${args[0]} ${args[1]}` : args[0]

function* generator($table) {
    for (let i = 1; i < $table.length; i++) {
        const tds = $table[i].children;
        const linkTo = tds[1].children[0].attribs.href;
        const name = tds[3].children[0].data;
        if (name.indexOf(keyword) > -1) {
            yield request(`${base}${linkTo}`);
        } else {
            continue
        }
    }
}

function* cleanIpsRange(ips) {
    for (let i = 0; i < ips.length; i++) {
        let ip = ips[i].children[0].data;
        ip = ip.replace(/\s/g, '');
        ip = ip.replace(/\n/g, '');
        yield ip;
    }
}

function* getIps(htmls) {
    for (let i = 0; i < htmls.length; i++) {
        console.log(`Getting IPs html number: ${i}`)
        let ipsRange = $('#block-table > tbody > tr > td > a', htmls[i]);
        yield* cleanIpsRange(ipsRange)
    }
}

function* getIpsOneHTML(html) {
    let ipsRange = $('#block-table > tbody > tr > td > a', html);
    yield* cleanIpsRange(ipsRange)
}

function fetchWeb(url) {
    request(url)
    .then((html) => {
        let $table = $('tr', html);

        let urls = [...generator($table)];

        if (urls.length === 0) {
            console.log(`Not data: ${url}`)
            return null;
        }

        for (const url of urls) {
            setTimeout(() => {
                url
                .then(html => {
                    console.log('Got ip ranges html')
                    let ipsArray = [...getIpsOneHTML(html)]
                    fs.appendFile('ips_range.txt', ipsArray.toString(), (err) => {
                        console.error(err)
                    })
                })
                .catch(err => {
                    console.error(err)
                })
            }, 120000)
        }

        return true
    })
    .catch((err) => {
        console.error(err);
    })
}


function main() {
    for (let i = 1; i < 13; i++) {
        const currentUrl = `${url}/${i == 1 ? '' : i}`
        console.log(currentUrl);
        if (i > 1) {
            setTimeout(() => {
                fetchWeb(currentUrl)
            }, 120000)
        } else {
            fetchWeb(currentUrl)
        }
    }
}

// main()