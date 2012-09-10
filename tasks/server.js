module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('server', 'Host tests and documentation.', function () {
    var
      dox = require('dox'),
      express = require('express'),
      handlebars = require('consolidate').handlebars,
      nib = require('nib'),
      stylus = require('stylus'),
      http = require('http'),
      path = require('path'),
      application = express(),
      server = http.createServer(application),
      io = require('socket.io').listen(server),
      name = grunt.config.get('pkg.name'),
      component = name !== 'ninja';

    application.configure(function () {
      application
        .engine('html', handlebars)
        .set('port', grunt.config.get('server.port') || 3000)
        .set('views', path.resolve(__dirname, 'server/views'))
        .set('view engine', 'html')
        .use(express.favicon())
        .use(express.logger(function () {}))
        .use(express.bodyParser())
        .use(express.methodOverride())
        .use(application.router)
        .use(express.static(path.resolve(__dirname, 'server/public')));
    });

    application.configure('development', function () {
      application.use(express.errorHandler());
    });

    function style(render) {
      stylus(grunt.file.read(grunt.file.expand('library/<%= pkg.name %>.styl')))
        .use(nib())
        .import('nib')
        .import(path.resolve(__dirname, '../library/ninja-code'))
        .import(path.resolve(__dirname, '../library/ninja-table'))
        .import(path.resolve(__dirname, '../library/ninja-documentation'))
        .import(path.resolve(__dirname, '../library/ninja-qunit'))
        .set('force', true)
        .set('compress', true)
        .render(function (error, styles) {
          if (error) {
            grunt.log.error(error);
          } else {
            render(styles);
          }
        });
    }

    application.get('/', function (req, res) {
      var
        middle = dox.parseComments(grunt.file.read(grunt.file.expand(grunt.config.get('documentation.ninja.src')))),
        first = middle.shift(),
        last = middle.pop(),
        socket;

      if (req.param('socket') === 'false') {
        socket = false;
      } else {
        socket = true;
      }

      style(function (style) {
        res.render('documentation', {
          name: name,
          component: component,
          first: first,
          middle: middle,
          last: last,
          socket: socket,
          style: style
        });
      });
    });

    application.get('/library/ninja.js', function (req, res) {
      res.sendfile(path.resolve(__dirname, '../library/ninja.js'));
    });

    application.get('/library/*.js', function (req, res) {
      res.set('Content-Type', 'text/javascript');

      res.send(grunt.file.read(grunt.file.expand('library/<%= pkg.name %>.js')));
    });

    application.get('/test/*.js', function (req, res) {
      res.set('Content-Type', 'text/javascript');

      res.send(grunt.file.read(grunt.file.expand('test/<%= pkg.name %>.js')));
    });

    application.get('/test', function (req, res) {
      style(function (style) {
        res.render('test', {
          name: name,
          component: component,
          style: style,
          fixture: grunt.file.read(grunt.file.expand('test/<%= pkg.name %>.html'))
        });
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

      grunt.registerTask('reload', function () {
        socket.volatile.emit('reload', 'Reloading page...');
      });

      grunt.registerTask('restyle', function () {
        style(function (style) {
          socket.emit('restyle', style, 'Restyling page...');
        });
      });
    });
  });
};
