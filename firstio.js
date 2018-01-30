/*
# LEARN YOU THE NODE.JS FOR MUCH WIN!

 ## MY FIRST I/O! (Exercise 3 of 13)

  Write a program that uses a single synchronous filesystem operation to
  read a file and print the number of newlines (\n) it contains to the
  console (stdout), similar to running cat file | wc -l.

  The full path to the file to read will be provided as the first
  command-line argument (i.e., process.argv[2]). You do not need to make
  your own test file.
*/

var fs = require('fs');
var buf = fs.readFileSync(process.argv[2]);
//read the data from file specified and saves it in Buffer type object
var str = buf.toString();
//convert Buffer type object into string
var str1 = str.split("\n");
//split the whole string into parts using "\n" as delimiter
console.log(str1.length - 1);
//print the number of \n in the whole long string
/*
Here's the official solution in case you want to compare notes:

─────────────────────────────────────────────────────────────────────────────

    var fs = require('fs')

    var contents = fs.readFileSync(process.argv[2])
    var lines = contents.toString().split('\n').length - 1
    console.log(lines)

    // note you can avoid the .toString() by passing 'utf8' as the
    // second argument to readFileSync, then you'll get a String!
    //
    // fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1

─────────────────────────────────────────────────────────────────────────────
*/
