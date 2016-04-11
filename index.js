/*
  Copyright (c) 2013 - 2016 Charlie Robbins, Jarrett Cruger & the Contributors.
  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:
  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  THIS LITTLE PROXY IS MADE FOR THE GIRL I LOVE.
*/

var util = require('util'),
    http = require('http'),
    httpProxy = require('http-proxy');


var proxy = httpProxy.createProxyServer();




// To modify the proxy connection before data is sent, you can listen
// for the 'proxyReq' event. When the event is fired, you will receive
// the following arguments:
// (http.ClientRequest proxyReq, http.IncomingMessage req,
//  http.ServerResponse res, Object options). This mechanism is useful when
// you need to modify the proxy request before the proxy connection
// is made to the target.
proxy.on('proxyReq', function(proxyReq, req, socket, options, head) {
  console.log('proxy start');
  console.log(req.url);
});


proxy.on('proxyRes', function(proxyRes, pReq, pRes) {
  console.log('receive data');
});


// Catch the error
proxy.on('error', function(e) {
  console.log(e);
});


// This is not the Proxy itself
var server = http.createServer(function(req, res) {
  // 124.202.166.46 is a CDN IP, which may be changed.
  req.headers.host = '124.202.166.46';
  req.url = req.url.replace('http://', 'http://124.202.166.46/');

  proxy.web(req, res, {
    target: 'http://124.202.166.46/'
  });
});


console.log("listening on port 4163")
server.listen(4163);

