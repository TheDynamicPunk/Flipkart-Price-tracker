const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const scrape = require('./scrape');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile('frontend/index.html', {root: __dirname});
});

app.get('/download', (req, res) => {
    setTimeout(() => {
        console.log('in /download: ');
        const file = './upload-folder/prices.csv';
        console.log(file);
        res.download(file);
    }, 15000);
});

app.post('/api', (req, res) => {
    const links = req.body.productLinks;
    scrape(links);
    res.send('succes!');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})