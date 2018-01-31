/*
  ## JUGGLING ASYNC (Exercise 9 of 13)

  This problem is the same as the previous problem (HTTP COLLECT) in that
  you need to use http.get(). However, this time you will be provided with
  three URLs as the first three command-line arguments.

  You must collect the complete content provided to you by each of the URLs
  and print it to the console (stdout). You don't need to print out the
  length, just the data as a String; one line per URL. The catch is that you
  must print them out in the same order as the URLs are provided to you as
  command-line arguments.

 ─────────────────────────────────────────────────────────────────────────────

 ## HINTS

  Don't expect these three servers to play nicely! They are not going to
  give you complete responses in the order you hope, so you can't naively
  just print the output as you get it because they will be out of order.

  You will need to queue the results and keep track of how many of the URLs
  have returned their entire contents. Only once you have them all, you can
  print the data to the console.

  Counting callbacks is one of the fundamental ways of managing async in
  Node. Rather than doing it yourself, you may find it more convenient to
  rely on a third-party library such as [async](https://npmjs.com/async) or
  [after](https://npmjs.com/after). But for this exercise, try and do it
  without any external helper library.

 ─────────────────────────────────────────────────────────────────────────────  */

var http= require('http')//includes http module
var url1 = process.argv[2]
var url2 = process.argv[3]
var url3 = process.argv[4]

var one ="";
var two ="";
var three ="";

http.get(url1 ,function(response){//get url function
    response.setEncoding('utf8');
    response.on("error", console.error);
    response.on("data", function(data){
     one = one + data;
   });
//We nest it if we don't want to use looping
   response.on("end",function(){
     console.log(one);
//for 2nd Url
     http.get(url2 ,function(response){
         response.setEncoding('utf8');
         response.on("error", console.error);
         response.on("data", function(data){
          two = two + data;
        });

        response.on("end",function(){
          console.log(two);
//for 3rd Url
          http.get(url3 ,function(response){
              response.setEncoding('utf8');
              response.on("error", console.error);
              response.on("data", function(data){
               three = three + data;
             });

             response.on("end",function(){
               console.log(three);
             })
              });
        })
         });
   })
    });


/*Official Soln:
var http = require('http')
   var bl = require('bl')//A Node.js Buffer list collector, reader and streamer thingy.
   //a data structure like link list or lists
   var results = []
   var count = 0

   function printResults () {//printing purpose
     for (var i = 0; i < 3; i++) {
       console.log(results[i])
     }
   }

   function httpGet (index) {//http get function in self called looping
     http.get(process.argv[2 + index], function (response) {// till now you should have understood this!
       response.pipe(bl(function (err, data) {//creating a pipeline from bufferlist
         if (err) {
           return console.error(err)//error handling
         }

         results[index] = data.toString()//conversion of data into string
         count++

         if (count === 3) {
           printResults()
         }
       }))
     })
   }

   for (var i = 0; i < 3; i++) {
     httpGet(i)//repetating loop of execution for above function
   }


*/
