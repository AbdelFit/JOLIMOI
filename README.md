# jolimoi

## frontend
- Folder : ./
- Run : npm install -> npm run serve
- Technos : vue, bootstrap, bootstrap-vue
- Http : localhost:8080

## backend
- Folder : ./server
- Run : npm install -> node index.js
- Technos : express, body-parser
- Http : localhost:3000

## 1st part of the test
Instructions :
- convert a decimal number to roman number
- the decimal number should be between 1 and 100
- the request must be done with AJAX
Done :
- with Express, create a route that will convert the passed decimal number to roman number and passed it as a response
- in the front, create an async function to fetch the Express/route and pass decimal number, then get the response and display it

## 2nd part of the test
Instructions :
- same as the 1st part, but this time the response must be sent via a SSE
Done :
- create a SSE open connection that send the roman number whenever the AJAX is called
- the request is still done by AJAX, but the response comes from SSE
- in the front, create a listen to en EventSource, and display the response whenever the value has changed