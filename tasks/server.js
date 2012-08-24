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
      app = express(),
      server = http.createServer(app),
      io = require('socket.io').listen(server),
      name = grunt.config.get('pkg.name'),
      component = name !== 'ninja';

    app.configure(function () {
      app.engine('html', handlebars);
      app.set('port', grunt.config.get('server.port') || 3000);
      app.set('views', path.resolve(__dirname, 'server/views'));
      app.set('view engine', 'html');
      app.use(express.favicon());
      app.use(express.logger(function () {}));
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use(app.router);
      app.use(express.static(path.resolve(__dirname, 'server/public')));
    });

    app.configure('development', function () {
      app.use(express.errorHandler());
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

    app.get('/', function (req, res) {
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

    app.get('/library/ninja.js', function (req, res) {
      res.sendfile(path.resolve(__dirname, '../library/ninja.js'));
    });

    app.get('/library/*.js', function (req, res) {
      res.set('Content-Type', 'text/javascript');

      res.send(grunt.file.read(grunt.file.expand('library/<%= pkg.name %>.js')));
    });

    app.get('/test/*.js', function (req, res) {
      res.set('Content-Type', 'text/javascript');

      res.send(grunt.file.read(grunt.file.expand('test/<%= pkg.name %>.js')));
    });

    app.get('/test', function (req, res) {
      style(function (style) {
        res.render('test', {
          name: name,
          component: component,
          style: style,
          fixture: grunt.file.read(grunt.file.expand('test/<%= pkg.name %>.html'))
        });
      });
    });

    server.listen(app.get('port'));

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
