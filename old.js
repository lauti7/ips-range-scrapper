// request(url)
//     .then((html) => {
//         let $table = $('tr', html);

//         let urls = [...generator($table)];

//         Promise.all(urls)
//             .then(htmls => {
//                 console.log('Got IPs ranges')
//                 let ipsArray = [...getIps(htmls)]
//                 fs.writeFileSync('test2.json', JSON.stringify(ipsArray));
//             })
//             .catch(err => {
//                 console.error(err);
//             })

//     })
//     .catch((err) => {
//         console.error(err);
//     })