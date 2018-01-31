/*

## HTTP COLLECT (Exercise 8 of 13)

Write a program that performs an HTTP GET request to a URL provided to you
as the first command-line argument. Collect all data from the server (not
just the first "data" event) and then write two lines to the console
(stdout).

The first line you write should just be an integer representing the number
of characters received from the server. The second line should contain the
complete String of characters sent by the server.

─────────────────────────────────────────────────────────────────────────────
*/

var http= require('http')//including http module

var alldata ="";
http.get(process.argv[2],function(response){//  callback http get function
    response.setEncoding('utf8');//converting encoded text on network into plaintext
    response.on("error", console.error);//error handling
    response.on("data", function(data){//response callback function
     alldata = alldata + data;//concatinating data with alldata
   });

   response.on("end",function(){//printingreponse on control
     console.log(alldata.length);
     console.log(alldata);
   })
    });
/*
Official Soln

    var http = require('http')
    var bl = require('bl')//you need to install this using npm

    http.get(process.argv[2], function (response) {
      response.pipe(bl(function (err, data) {
        if (err) {
          return console.error(err)
        }
        data = data.toString()
        console.log(data.length)
        console.log(data)
      }))
    })
*/
