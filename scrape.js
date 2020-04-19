const request = require('request-promise');
const cheerio = require('cheerio');
const json2csv = require('json2csv').Parser;
const fs = require('fs');

async function scrape(links) {
    
    if(links)
    {
        let trackerData = [];
        let linksArray = links.split(',');

        for (item of linksArray) {
            try {
                const response = await request({
                    uri: item,
                    headers: {
                        "Accept-Encoding": "gzip, deflate, br",
                        "Accept-Language": "en-US,en;q=0.5"
                    },
                    gzip: true
                });

                let data = cheerio.load(response);
                let productName = data('._35KyD6').text();
                console.log(productName);
                let price = data('._3qQ9m1').text();
                price = price.replace(/,/g,'');
                console.log(price);
                let deliveryTime = data('._29Zp1s').text();
                deliveryTime = deliveryTime.replace('?', '');
                console.log(deliveryTime);


                trackerData.push({
                    Name: productName, 
                    Price: price, 
                    'Delivery Estimate': deliveryTime
                });

            } catch (error) {
                console.log(error);
            }
        }

        const j2cp = new json2csv();
        const csv = j2cp.parse(trackerData);

        fs.writeFileSync('./uploads/prices.csv', csv);
        console.log('Scraping complete!');

        return 200;
    }
}


module.exports = scrape;