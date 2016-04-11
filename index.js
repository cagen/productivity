/*
  basic-proxy.js: Basic example of proxying over HTTP
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
*/

var util = require('util'),
    colors = require('colors'),
    http = require('http'),
    httpProxy = require('http-proxy');


//
// Basic Http Proxy Server
//
// var proxy = httpProxy.createProxyServer({
//   forward: {
//     port: 80,
//     host: '220.112.195.148'
//   }
// });

//
// Target Http Server
//


// var proxy = httpProxy.createServer({
//   forward: '220.112.195.148:80',
//   changeOrigin: true,
//   autoRewrite: true
// }).listen(8003);

// proxy.web()





var proxy = httpProxy.createProxyServer({
  target: 'http://124.202.166.46/'
});


// To modify the proxy connection before data is sent, you can listen
// for the 'proxyReq' event. When the event is fired, you will receive
// the following arguments:
// (http.ClientRequest proxyReq, http.IncomingMessage req,
//  http.ServerResponse res, Object options). This mechanism is useful when
// you need to modify the proxy request before the proxy connection
// is made to the target.
//

proxy.on('error', function(e) {
  console.log(e);
});

// http://124.202.166.46
// proxy.on('proxyReq', function(proxyReq, req, socket, options, head) {
//   req.headers.host = '124.202.166.46';
//   req.url = req.url.replace('http://', 'http://124.202.166.46/');
// });


proxy.on('proxyRes', function(proxyRes, pReq, pRes) {
  console.log('back');
})

// proxy.listen(8003);


var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  req.headers.host = '124.202.166.46';
  req.url = req.url.replace('http://', 'http://124.202.166.46/');
  // console.log(req.url);
  // console.log(req.headers);
  proxy.web(req, res, {
    target: 'http://124.202.166.46/'
  });
});


console.log("listening on port 8003")
server.listen(8003);

