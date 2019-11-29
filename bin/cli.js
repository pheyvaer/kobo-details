#!/usr/bin/env node

const getBookDetails = require('../index');
const program = require('commander');

main();

async function main() {
  program.requiredOption('-u, --url <url>', 'Kobo.com URL. Reuse this option for multiple URLs', collect);
  program.parse(process.argv);

  program.url.forEach(async url => {
    try {
      const data = await getBookDetails(url);
      console.log(JSON.stringify(data, null, 2));
    } catch (e) {
      console.error(`Error for ${url} ${e.message}`);
    }
  });
}

function collect(value, previous) {
  if (!previous) {
    previous = [];
  }

  return previous.concat([value]);
}