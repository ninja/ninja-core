module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('server', 'Host tests and documentation.', function () {

    var
      path = require('path'),
      dox = require('dox'),
      express = require('express'),
      handlebars = require('consolidate').handlebars,
      http = require('http'),
      application = express(),
      server = http.createServer(application),
      io = require('socket.io').listen(server),
      name = grunt.config.get('pkg.name'),
      // render = require('./server/utilities/render'),
      style = require('./server/utilities/style');

    function styleBuffer() {
      return grunt.file.read(grunt.config.get('server.stylus'));
    }

    application.configure(function () {
      application
        .engine('html', handlebars)
        .set('port', grunt.config.get('server.port') || 3000)
        .set('views', path.resolve(__dirname, 'server/views'))
        .set('view engine', 'html')
        .use(express.static(path.resolve(__dirname, 'server/public')))
        .use(express.logger(function () {}))
        .use(express.bodyParser())
        .use(express.methodOverride())
        .use(application.router)
        .use(express.errorHandler());
    });

    application.get('*', function (request, response, next) {
      response.locals.title = name;

      response.locals.component = name !== 'ninja';

      if (request.param('socket') === 'false') {
        response.locals.socket = false;
      } else {
        response.locals.socket = true;
      }

      next();
    });

    application.get('/', function (request, response) {
      var middle = dox.parseComments(grunt.file.read(grunt.config.get('concat.ninja.src')));

      style(styleBuffer(), response);

      response.render('documentation', {
        first: middle.shift(),
        last: middle.pop(),
        middle: middle
      });
    });

    application.get('/library/ninja.js', function (request, response) {
      response.sendfile(path.resolve(__dirname, '../library/ninja.js'));
    });

    application.get('/library/*.js', function (request, response) {
      response.set('Content-Type', 'text/javascript');

      response.send(grunt.file.read(grunt.config.get('concat.ninja.src')));
    });

    application.get('/test/*.js', function (request, response) {
      response.set('Content-Type', 'text/javascript');

      response.send(grunt.file.read(grunt.config.get('server.test.js')));
    });

    application.get('/test', function (request, response) {
      style(styleBuffer(), response);

      response.render('test', {
        fixture: grunt.file.read(grunt.config.get('server.test.html'))
      });
    });

    server.listen(application.get('port'));

    io.configure(function () {
      io.set('log level', 1);
    });

    io.sockets.on('connection', function (socket) {
      socket.on('reload', function (message) {
        console.log(message);
      });

      grunt.registerTask('restart', function () {
        // server.reload();
        socket.emit('restart', 'Restarting server...');
      });

      grunt.registerTask('reload', function () {
        socket.emit('reload', 'Reloading page...');
      });

      grunt.registerTask('restyle', function () {
        style(styleBuffer(), function (style) {
          socket.emit('restyle', style, 'Restyling page...');
        });
      });
    });
  });
};
