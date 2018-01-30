/*
## HTTP CLIENT (Exercise 7 of 13)

Write a program that performs an HTTP GET request to a URL provided to you
as the first command-line argument. Write the String contents of each
"data" event from the response to a new line on the console (stdout).

─────────────────────────────────────────────────────────────────────────────
*/
/*
//by using callback function method

var http = require(http);

http.get(process.argv[2], function callback(response) {
  if (err) throw err;
  response.setEncoding("utf8");
  response.on("error", function(err){
    console.log(err);
  });
  response.on("data",function(data){
    console.console.log(data);
  });
} );
*/
var http= require('http')//includes http networking

http.get(process.argv[2],function(response){//get function
//argv is for entering url as an argument
    response.setEncoding('utf8');//encoding is set to utf8 to convert it in plain text
    response.on("error", console.error);//error handling
    response.on("data", console.log);//prints data

    });
