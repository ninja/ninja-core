module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: { // overrides: https://github.com/jshint/jshint/blob/master/jshint.js#L253
        asi: false, // automatic semicolon insertion not allowed
        boss: false, // advanced usage of assignments not allowed
        browser: true, // browser globals allowed
        eqnull: false, // == null comparisons not allowed
        es5: true, // allow reserved words, such as `import` and `use`
        evil: false, // eval not allowed
        expr: false, // expression statements not allowed
        indent: 2, // two spaces for indenting required
        jquery: true, // jQuery globals allowed
        loopfunc: false, // functions within loops not allowed,
        node: true, // Node.js globals allowed,
        regexdash: false, // unescaped first/last dash (-) inside brackets not allowed
        shadow: false, // variable shadowing not allowed
        strict: true, // 'use strict'; in functions required
        supernew: false, // `new function () { ... };` and `new Object;` not allowed
        sub: false, // all forms of subscript not allowed
        trailing: true, // trailing whitespace not allowed
        white: true, // Crockford's whitespace rules required
        globals: {
          // QUnit globals allowed
          QUnit: false,
          asyncTest: false,
          deepEqual: false,
          equal: false,
          expect: false,
          notEqual: false,
          notStrictEqual: false,
          ok: false,
          raises: false,
          setup: false,
          start: false,
          stop: false,
          strictEqual: false,
          test: false
        }
      },
      gruntfile: ['gruntfile.js'],
      library: ['library/**/*.js'],
      tasks: ['tasks/*.js', 'tasks/public/socket.js'],
      test: ['test/**/*.js']
    },
    stylus: {
      ninja: {
        src: 'library/<%= pkg.name %>.styl',
        dest: 'distribution/<%= pkg.name %>.css'
      }
    },
    qunit: {
      ninja: 'http://localhost:3000/test'
    },
    documentation: 'distribution/<%= pkg.name %>.documentation.html',
    concat: {
      options: {
        banner: '/*!\n' +
          '<%= pkg.name %> <%= pkg.version %>\n' +
          '<%= pkg.homepage %>\n' +
          'Copyright 2008-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
          'Licensed per the terms of the <%= pkg.licenses[0].type %>\n' +
          '<%= pkg.licenses[0].url %>\n' +
          '*/',
        stripBanners: true
      },
      ninja: {
        src: 'library/<%= pkg.name %>.js',
        dest: 'distribution/<%= pkg.name %>.js'
      }
    },
    version: {
      options: {
        placeholder: '0.0.0development'
      },
      ninja: {
        src: '<%= concat.ninja.dest %>'
      }
    },
    uglify: {
      options: {
        banner: '/*<%= pkg.name %> <%= pkg.version %> <%= pkg.homepage %> Copyright 2008-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %> Licensed per the terms of the <%= pkg.licenses[0].type %> <%= pkg.licenses[0].url %>*/',
      },
      ninja: {
        src: '<%= concat.ninja.dest %>',
        dest: 'distribution/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile %>',
        tasks: ['jshint:gruntfile']
      },
      library: {
        files: '<%= jshint.library %>',
        tasks: ['jshint:library', 'qunit', 'reload']
      },
      stylus: {
        files: 'library/**/*.styl',
        tasks: ['restyle']
      },
      test: {
        files: ['<%= jshint.test.src %>', 'test/**/*.html'],
        tasks: ['jshint:test', 'qunit', 'reload']
      }
    },
    server: {
      port: 3000,
      stylus: 'library/<%= pkg.name %>.styl',
      test: {
        html: 'test/<%= pkg.name %>.html',
        js: 'test/<%= pkg.name %>.js'
      }
    }
  });

  grunt.registerTask('reload', function () {});

  grunt.registerTask('restyle', function () {});

  grunt.unregisterTasks('init');
};
