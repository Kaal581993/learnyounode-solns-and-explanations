/*
 ## TIME SERVER (Exercise 10 of 13)

  Write a TCP time server!

  Your server should listen to TCP connections on the port provided by the
  first argument to your program. For each connection you must write the
  current date & 24 hour time in the format:

     "YYYY-MM-DD hh:mm"

  followed by a newline character. Month, day, hour and minute must be
  zero-filled to 2 integers. For example:

     "2013-07-06 17:42"

  After sending the string, close the connection.
   */
var net = require('net');//includes/imports all net library functions
//we need to create a Transmission Control Protocol (TCP) time
//server that writes the current date and time to the socket in 24 hour format.

//In addition to an http module, node also has a TCP module
//that can be invoked with require(‘net’).


//Another important point is that we need to zero fill our results.
//That means 7:00 should be presented as 07:00.
//There are modules that will do this for you, but the official
//solution for this problem employees a very function to properly
//format the time.
function zeroFill(i) {
    return (i < 10 ? '0' : '') + i;
  //  As you can see, the official solution uses a function called zeroFill,
  // which accepts ‘i’ as an argument.  The zeroFill function uses the
  // conditional (ternary) operator to determine if a zero should be placed
  // in front of a value.  If ‘i’ is less than 10, i < 10 evaluates to true,
  // and zeroFill returns ‘0’ + i.  If ‘i’ is not less than 10, i < 10
  // evaluates to false, and zeroFill returns an empty string + ‘i’.

  // It is often times used in place of an if/else statement.
  //  The basic syntax is below.
      //condition ? 'expression if true' : 'expression if false'
}

function now() {
    var d = new Date();
    return d.getFullYear() + '-'
      + zeroFill(d.getMonth() + 1) + '-'
      + zeroFill(d.getDate()) + ' '
      + zeroFill(d.getHours()) + ':'
      + zeroFill(d.getMinutes());
  // The official solution uses a second function called ‘now’ to properly
  //format the date and time using the Date() object.  The Date() object is
  //assigned to the variable ‘d’.  Then we get the full year with getFullYear()
  //and concatenate it to the dash symbol.  After this we concatenate the result
  //of zeroFill(d.getmonth()) and so on all the way down to minutes to get our
  //properly formatted date.  The official solution breaks this into several lines
  //for readability.

}

var server = net.createServer(function(socket) {
  //Next, we assign the net.createServer() method to the variable server.
  // The createServer() method accepts a callback as an argument, which
  // accepts a socket.  Inside of the callback, we call the socket.end()
  // method and pass now() plus a newline character to the end() method
  // to write the date and time to the socket.


    socket.end(now() + '\n');
    //it is important to note that the data of the time server only needs
    //to be written to the open socket on our server.  It does not need to be
    //logged to the console.  To do this we only need to create a function that
    // returns the date and time in the desired format, and call that function
    //inside of the socket.end() method.
});
server.listen(Number(process.argv[2]));
// Finally, we listen with the listen() method for the port passed as
// the second command line argument.
