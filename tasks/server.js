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
      app = express();

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
      app.use(stylus.middleware({
        dest: path.resolve(__dirname, 'server/public'),
        src: './library',
        compile: function (string) {
          return stylus(string)
            .set('force', true)
            .set('compress', true)
            .use(nib())
            ['import']('nib')
            ['import'](path.resolve(__dirname, '../library/ninja'))
            ['import'](path.resolve(__dirname, '../library/ninja-code'))
            ['import'](path.resolve(__dirname, '../library/ninja-table'));
        }
      }));
      app.use(express['static'](path.resolve(__dirname, 'server/public')));
    });

    app.configure('development', function () {
      app.use(express.errorHandler());
    });

    app.get('/', function(req, res) {
      res.render('documentation', {
        name: grunt.config.get('pkg.name'),
        documentation: dox.parseComments(grunt.file.read(grunt.file.expandFiles(grunt.config.get('dox.dist.src'))))
      });
    });

    app.get('/test', function(req, res) {
      res.render('documentation', {
        name: 'Ninja Autocomplete jQuery Plugin'
      });
    });

    http.createServer(app).listen(app.get('port'));

    grunt.log.writeln('For manual reload, visit http://localhost:' + app.get('port'));
  });
};
