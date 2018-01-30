/*
## FILTERED LS (Exercise 5 of 13)

Create a program that prints a list of files in a given directory,
filtered by the extension of the files. You will be provided a directory
name as the first argument to your program (e.g. '/path/to/dir/') and a
file extension to filter by as the second argument.

For example, if you get 'txt' as the second argument then you will need to
filter the list to only files that end with .txt. Note that the second
argument will not come prefixed with a '.'.

Keep in mind that the first arguments of your program are not the first
values of the process.argv array, as the first two values are reserved for
system info by Node.

The list of files should be printed to the console, one file per line. You
must use asynchronous I/O.

─────────────────────────────────────────────────────────────────────────────
*/



  var fs = require("fs");//including filesystem libraries

  var path = require('path');//include path folder libraries
  var mydir = process.argv[2];//argument1 for directory
  var ext1 = '.' + process.argv[3];//argument2 for storing extension
  fs.readdir(mydir, function(err, files){//read directory function
    if(err){
      throw err   //error handling
      }
  //console.log(files);
  files.forEach(function(filename){//looping to read file listing purpose
    var ext = path.extname(filename);// fetching the extension name in ext
    if(ext === ext1){ // comparing the filename from list
      console.log(filename);//printing the file name log
    }
  });
});
/*

 Here's the official solution in case you want to compare notes:

─────────────────────────────────────────────────────────────────────────────

    var fs = require('fs')
    var path = require('path')

    var folder = process.argv[2]
    var ext = '.' + process.argv[3]

    fs.readdir(folder, function (err, files) {
      if (err) return console.error(err)
      files.forEach(function (file) {
        if (path.extname(file) === ext) {
          console.log(file)
        }
      })
    })

─────────────────────────────────────────────────────────────────────────────
*/
