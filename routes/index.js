var express = require('express');
var router = express.Router();
var http = require('http');
var qs = require('querystring');
/* GET home page. */
var options = {
    host: 'api.1-blog.com',
    port: 80,
    path: '/biz/bizserver/xiaohua/list.do',
    method: 'GET'
};
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/getData', function (req, res, next) {
    var request = http.request(options, function (response) {
        response.setEncoding('utf8');
        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });
        response.on('end', function () {
            res.send(data);
        });
    });
    request.on('error', function (e) {
      console.log('problem with request: ' + e.message);
    });
    request.end();
});
module.exports = router;
