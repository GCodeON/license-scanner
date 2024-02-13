# License Scanner
## _Scan License barcode

This application allows users to pull data from a driver's license via an their webcam or an uploaded image file.

## Features

- Access user's camera on their device
- Switch Between device's video inputs
- Import an image from user's local device
- Scan image and extract license information from pdf417 barcode
- Display user information encoded on the barcode

## Tech

This license scanner uses the following open source projects:

- [NEXT.js] - A react framework for web apps!
- [React.js] - A library for web and native user interfaces.
- [zxing.js] - A multi-format 1D/2D barcode image processing library.
- [Tesseract.js] - A Javascript port of the popular Tesseract OCR engine.
- [Sass.js] - A popular CSS pre-processor.

## Installation

This application requires [Node.js](https://nodejs.org/) v18.17.0+ to run.
```sh
nvm use 18.17.0
```

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm run dev
```
View project locally 
```sh
http://localhost:3000
```
## Project Architecture

├── /src
│   ├── /app
│   │   ├── layout.js
│   │   ├── page.js
│   ├── /components
│   ├── /scss
├── /public
│   ├── css
│   │   ├── **/*.css
│   ├── images
│   ├── js
│   ├── index.html
├── /dist (or build)
├── /node_modules
├── package.json
├── package-lock.json
└── .gitignore   


#### Building for source

For production release:

```sh
npm run build
```

## Assumptions

- Used all client side open source libraries, without requiring an API key. 
- Responsive web design using a mobile first approach to fulfill cross-platform compatibility
- Tried using an OCR approach to scan information from the front of the license, however the data extraction varied widely depending on the quality of the image
- creating a regex pattern to parse data from OCR process was not viable.
- Opted to scan the PDF417 barcode on the back of the license to extract user information
- Reformatted raw data by mapping three letter codes to field[value] object with proper data values


## License

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job.)


   [Sass.js]: <https://sass-lang.com>
   [zxing.js]: <https://github.com/zxing-js/browser>
   [Tesseract.js]: <https://tesseract.projectnaptha.com/>
   [NEXT.js]: <https://nextjs.org>
   [React.js]: <https://react.devm>