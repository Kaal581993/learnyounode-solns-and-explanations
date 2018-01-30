/*
## MY FIRST ASYNC I/O! (Exercise 4 of 13)

  Write a program that uses a single asynchronous filesystem operation to
  read a file and print the number of newlines it contains to the console
  (stdout), similar to running cat file | wc -l.

  The full path to the file to read will be provided as the first
  command-line argument.

*/

  var fs = require("fs");
/*
  Instead of fs.readFileSync() you will want to use fs.readFile() and
  instead of using the return value of this method you need to collect the
  value from a callback function that you pass in as the second argument. To
  learn more about callbacks, check out:
  (https://github.com/maxogden/art-of-node#callbacks).
  */

  fs.readFile(process.argv[2],function callback (err, data) {
    //as per the previous Problem we used sunc function for file handling as followed
    //(var buf = fs.readFileSync(process.argv[2]);)
    //here we declare a callback function
  if (err) {return console.console.error(err);}//error handling
    var str = data.toString();//conversion into string
    var str1 = str.split("\n");//splits the string from newlines & stores it in str1 array
    console.log(str1.length - 1);//prints str length

 });
/*
 Here's the official solution in case you want to compare notes:

─────────────────────────────────────────────────────────────────────────────

   var fs = require('fs')
   var file = process.argv[2]

   fs.readFile(file, function (err, contents) {
     if (err) {
       return console.log(err)
     }
     // fs.readFile(file, 'utf8', callback) can also be used
     var lines = contents.toString().split('\n').length - 1
     console.log(lines)
   })
*/
