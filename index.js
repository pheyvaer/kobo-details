const https = require('https');
const cheerio = require('cheerio');

function getBookDetails(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const {statusCode} = res;

      let error;
      if (statusCode !== 200) {
        error = new Error(`Request Failed. Status Code: ${statusCode}`);
        reject(error);
        // Consume response data to free up memory
        res.resume();
        return;
      }

      res.setEncoding('utf8');

      let html = '';

      res.on('data', (chunk) => {
        html += chunk;
      });

      res.on('end', () => {
        const $html = cheerio.load(html);
        const name = $html('span.title.product-field').text().replace('\n', '');
        const price = $html('.active-price span.price').html().replace(' &#x20AC;', '');

        resolve({name, price, url});
      });
    }).on('error', (e) => {
      reject(e);
    });
  });
}

module.exports = getBookDetails;