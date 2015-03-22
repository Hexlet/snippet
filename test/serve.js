
/**
 * Module Dependencies.
 */

var snippet = require('..');

/**
 * Serve snippet middleware (Used by duo-test).
 */

module.exports = function(app){
  app.use(function*(next){
    // snippet
    if ('/snippet' == this.path) {
      this.type = 'js';
      this.body = snippet.min({
        host: '//localhost:3000/analytics.js'
      });
    }
  
    // analytics.js
    if ('/analytics.js' == this.path) {
      this.type = 'js';
      this.body = 'loaded = true';
    }

    yield next;
  });
};