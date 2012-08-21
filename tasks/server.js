module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('server', function () {
    var
      fs = require('fs'),
      dox = require('dox'),
      express = require('express'),
      handlebars = require('consolidate').handlebars,
      nib = require('nib'),
      stylus = require('stylus'),
      http = require('http'),
      path = require('path'),
      app = express(),
      name = grunt.config.get('pkg.name'),
      component = name !== 'ninja';

    app.configure(function () {
      app.engine('html', handlebars);
      app.set('port', grunt.config.get('reload.proxy.port') ||  grunt.config.get('server.port') || 3000);
      app.set('views', path.resolve(__dirname, 'server/views'));
      app.set('view engine', 'html');
      app.use(express.favicon());
      app.use(express.logger('dev'));
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use(app.router);
      app.use(express['static'](path.resolve(__dirname, 'server/public')));
      app.use(express['static'](path.resolve(__dirname, 'server/public')));
    });

    app.configure('development', function () {
      app.use(express.errorHandler());
    });

    app.get('/', function (req, res) {
      stylus(grunt.file.read(grunt.file.expand('library/<%= pkg.name %>.styl')))
        .use(nib())['import']('nib')
        ['import'](path.resolve(__dirname, '../library/ninja'))
        ['import'](path.resolve(__dirname, '../library/ninja-code'))
        ['import'](path.resolve(__dirname, '../library/ninja-table'))
        .set('force', true)
        .set('compress', true)
        .render(function (error, style) {
          if (error) {
            grunt.log.error(error);
          } else {
            res.render('documentation', {
              name: name,
              component: component,
              documentation: dox.parseComments(grunt.file.read(grunt.file.expandFiles(grunt.config.get('dox.dist.src')))),
              style: style
            });
          }
        });
    });

    app.get('/library/ninja.js', function (req, res) {
      res.sendfile(path.resolve(__dirname, '../library/ninja.js'));
    });

    app.get('/library/*.js', function (req, res) {
      res.send(grunt.file.read(grunt.file.expand('library/<%= pkg.name %>.js')));
    });

    app.get('/test/*.js', function (req, res) {
      res.send(grunt.file.read(grunt.file.expand('test/<%= pkg.name %>.js')));
    });

    app.get('/test', function (req, res) {
      stylus(grunt.file.read(grunt.file.expand('library/<%= pkg.name %>.styl')))
        .use(nib())['import']('nib')
        .set('force', true)
        .set('compress', true)
        .render(function (error, style) {
          if (error) {
            grunt.log.error(error);
          } else {
            res.render('test', {
              name: name,
              component: component,
              style: style
            });
          }
        });
    });

    http.createServer(app).listen(app.get('port'));

    grunt.log.writeln('For manual reload, visit http://localhost:' + app.get('port'));
  });
};
