#!/usr/bin/env node

const getBookDetails = require('../index');
const program = require('commander');
const fs = require('fs');

let urls = [];

main();

async function main() {
  program.option('-u, --url <url>', 'Kobo.com URL. Reuse this option for multiple URLs', collect, []);
  program.option('-f, --file <path>', 'File with one URL per line', processFile);
  program.option('-c, --csv', 'Print as CSV');
  program.parse(process.argv);

  urls = urls.concat(program.url);

  if (urls.length !== 0) {
    const results = [];

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];

      try {
        const data = await getBookDetails(url);
        results.push(data);
      } catch (e) {
        console.error(`Error for ${url} ${e.message}`);
      }
    }

    if (program.csv) {
      printAsCSV(results);
    } else {
      printAsJSON(results);
    }
  } else {
    console.error('Please provide at least one url. Use -h for more information.');
  }
}

function collect(value, previous) {
  if (!previous) {
    previous = [];
  }

  return previous.concat([value]);
}

function printAsJSON(books) {
  books.forEach(async book => {
    console.log(JSON.stringify(book, null, 2));
  });
}

function printAsCSV(books) {
  console.log('name,price,url');

  books.forEach(book => {
    console.log(`"${book.name}","${book.offers.price}","${book.url}"`);
  });
}

function processFile(filePath) {
  const str = fs.readFileSync(filePath, 'utf-8');
  str.split('\n').forEach(url => {
    urls.push(url);
  });
}
