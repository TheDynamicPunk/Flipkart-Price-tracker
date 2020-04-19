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
    console.log('in /download: ');
    const file = './upload-folder/prices.csv';
    console.log(file);
    res.download(file);
});

app.post('/api', async (req, res) => {
    const links = req.body.productLinks;
    const status = await scrape(links);
    res.status(status).send('succes!');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})