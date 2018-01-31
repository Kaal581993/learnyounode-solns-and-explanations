/*
## HTTP JSON API SERVER (Exercise 13 of 13)

  Write an HTTP server that serves JSON data when it receives a GET request
  to the path '/api/parsetime'. Expect the request to contain a query string
  with a key 'iso' and an ISO-format time as the value.

  For example:

  /api/parsetime?iso=2013-08-10T12:10:15.474Z

  The JSON response should contain only 'hour', 'minute' and 'second'
  properties. For example:

     {
       "hour": 14,
       "minute": 23,
       "second": 15
     }

  Add second endpoint for the path '/api/unixtime' which accepts the same
  query string but returns UNIX epoch time in milliseconds (the number of
  milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.
  For example:

     { "unixtime": 1376136615474 }

  Your server should listen on the port provided by the first argument to
  your program.
*/

// We need to make a JSON API server that accepts a url query string that
// includes an ISO time string.
// The server should respond with either an object that contains
// the hour, minute, and second, or an object that contains the Unix epoch
// time depending on which endpoint is included in the url query string.

// At this point, we know how to set up a server.  However, not much has
// been said about parsing urls.  The url module has some useful methods,
// including the parse() method.  The parse() method returns an object
// with the various components of a url.

// Try entering the command below into the command line as the hint suggests.
// node -pe "require('url').parse('/test?q=1', true)"

// This command parses a url in a test file included in learnyounode’s directory.
// The command -pe is short for ‘print’ and ‘evaluate’.
// You are evaluating your program and printing the result to the console.

/*
After you hit enter, you should see a result similar to the example below.
 The components of the url ‘/test?q=1’ are displayed as an object called Url.


Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?q=1',
  query: { q: '1' },
  pathname: '/test',
  path: '/test?q=1',
  href: '/test?q=1' }

  As you can see, the parse() method is handy because the we can access the various
  properties of the object.  For example, we can assign a url that makes a request
  to our server to a variable called url via dot notation with request.url.
*/
var http = require('http')//included http modules
var url = require('url')//includes url modules

var port = process.argv[2]

var parseTime = function (time) { //to fetch time
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

function unixTime (time) {//unix time
  return {unixtime: time.getTime()}
}

var parseQuery = function (url) {//query for time
  switch (url.pathname) {
    case '/api/parsetime':
      return parseTime(new Date(url.query.iso))
    case '/api/unixtime':
      return unixTime(new Date(url.query.iso))
    default: return 'please enter a valid endpoint url'
  }
}

http.createServer(function (request, response) {
  // assign request.url to variable url
  if (request.method === 'GET') {//server request method
    response.writeHead(200, {'Content-Type': 'application/json'})
    url = url.parse(request.url, true)
     // log contents of url to console
    response.end(JSON.stringify(parseQuery(url)))
  } else {
    response.writeHead(405)
    response.end()
  }
}).listen(+port, function () {// for server port
  console.log('Server listening on http://localhost:%s', port)
})

/*Official Solution:
var http = require('http')
   var url = require('url')

   function parsetime (time) {
     return {
       hour: time.getHours(),
       minute: time.getMinutes(),
       second: time.getSeconds()
     }
   }

   function unixtime (time) {
     return { unixtime: time.getTime() }
   }

   var server = http.createServer(function (req, res) {
     var parsedUrl = url.parse(req.url, true)
     var time = new Date(parsedUrl.query.iso)
     var result

     if (/^\/api\/parsetime/.test(req.url)) {
       result = parsetime(time)
     } else if (/^\/api\/unixtime/.test(req.url)) {
       result = unixtime(time)
     }

     if (result) {
       res.writeHead(200, { 'Content-Type': 'application/json' })
       res.end(JSON.stringify(result))
     } else {
       res.writeHead(404)
       res.end()
     }
   })
   server.listen(Number(process.argv[2]))
*/
