
var express = require('express'),
    write = require('fs').writeFileSync,
    snippet = require('..'),
    path = require('path');


/**
 * App.
 */

var app = express()
  .use(express.static(__dirname + '/..'))
  .set('views', __dirname);

/**
 * Routes.
 */

app.get('/analytics.js', function (req, res, next) {
  res.render('analytics.js');
});

app.get('/snippet-test/:min?', function (req, res, next) {
  var template = req.params.min ? snippet.min : snippet.max;
  res.render('index.html', {
    snippet: template({
      host: '//localhost:' + port + '/analytics.js'
    }),
    min: !! req.params.min
  });
});


/**
 * Start.
 */

var port = 4321;
var pid = path.resolve(__dirname, 'pid.txt');

app.listen(port, function () {
  write(pid, process.pid, 'utf-8');
  console.log('Listening on ' + port + '...');
});
