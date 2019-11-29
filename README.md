# kobo-details

Get the name and price of a book on kobo.com.

## Library
Install the library via 
```
npm i kobo-details
```
A usage example is given below:
```JavaScript
const getBookDetails = require('kobo-details');

const details = await getBookDetails('https://www.kobo.com/be/en/ebook/star-wars-queen-s-shadow');

console.log(details);
// {
//   "name": "Star Wars: Queen's Shadow",
//   "price": "12,29",
//   "url": "https://www.kobo.com/be/en/ebook/star-wars-queen-s-shadow"
// }
```

## CLI
Install the CLI via 
```
npm i -g kobo-details
```
A usage example is given below:
```
kobo-details -u https://www.kobo.com/be/en/ebook/star-wars-queen-s-shadow
```
## License

[MIT](LICENSE)