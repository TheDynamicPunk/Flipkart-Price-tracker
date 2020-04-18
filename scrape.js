const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

function scrape(links) {
    if(links)
    {
        const writeStream = fs.createWriteStream('upload-folder/prices.csv');
        writeStream.write(`S.No, Product Name, Price, Delivery Date \n`);

        let linksArray = links.split(',');

        var counter = 0;

        linksArray.forEach( item => {
            
            request(item, (error, response, html) => {
                if(response.statusCode === 200)
                {
                    counter += 1;
                    let data = cheerio.load(html);
                    let productName = data('._35KyD6').text();
                    let price = data('._3qQ9m1').text();
                    console.log('before: '+price);
                    if(price.indexOf(',') != -1)
                        price = price.replace(/,/g,'');
                    console.log('after:' + price);
                    let deliveryTime = data('._29Zp1s').text();
        
                    writeStream.write(`${counter}, ${productName}, ${price}, ${deliveryTime}\n`);
                }
                else {
                    console.log(error);
                }
            });
        });
        console.log('scraped!');
    }
}


module.exports = scrape;