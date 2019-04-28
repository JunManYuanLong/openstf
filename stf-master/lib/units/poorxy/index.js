var http = require('http')

var express = require('express')
var httpProxy = require('http-proxy')

var logger = require('../../util/logger')

module.exports = function(options) {
  var log = logger.createLogger('poorxy')
  var app = express()
  var server = http.createServer(app)
  var proxy = httpProxy.createProxyServer()

  proxy.on('error', function(err) {
    log.error('Proxy had an error', err.stack)
  })

  app.set('strict routing', true)
  app.set('case sensitive routing', true)
  app.set('trust proxy', true)

  app.all("/api/v1/devices",function(req,res,next){
      //设置允许跨域的域名，*代表允许任意域名跨域
      res.header("Access-Control-Allow-Origin","*");
      //允许的header类型
      res.header("Access-Control-Allow-Headers","content-type");
      res.header("Access-Control-Allow-Credentials", true);
      //跨域允许的请求方式
      res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
      if (req.method.toLowerCase() == 'options')
      {
        res.end();
        // res.send(200);  //让options尝试请求快速结束
      }
      else
      next();
  })

  ;['/static/auth/*', '/auth/*'].forEach(function(route) {
    app.all(route, function(req, res) {
      proxy.web(req, res, {
        target: options.authUrl
      })
    })
  })

  ;['/s/image/*'].forEach(function(route) {
    app.all(route, function(req, res) {
      proxy.web(req, res, {
        target: options.storagePluginImageUrl
      })
    })
  })

  ;['/s/apk/*'].forEach(function(route) {
    app.all(route, function(req, res) {
      proxy.web(req, res, {
        target: options.storagePluginApkUrl
      })
    })
  })

  ;['/s/*'].forEach(function(route) {
    app.all(route, function(req, res) {
      proxy.web(req, res, {
        target: options.storageUrl
      })
    })
  })

  ;['/api/*'].forEach(function(route) {
    app.all(route, function(req, res) {
      proxy.web(req, res, {
        target: options.apiUrl
      })
    })
  })
  app.use(function(req, res) {
    proxy.web(req, res, {
      target: options.appUrl
    })
  })

  server.listen(options.port)
  log.info('Listening on port %d', options.port)
}
