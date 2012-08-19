module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: '<json:package.json>',
    banner: '/*!\n' +
      '<%= pkg.name %> <%= pkg.version %>\n' +
      '<%= pkg.homepage %>\n' +
      'Copyright 2008-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
      'Licensed per the terms of the <%= pkg.licenses[0].type %>\n' +
      '<%= pkg.licenses[0].url %>\n' +
      '*/',
    jshint: {
      options: { // overrides: https://github.com/jshint/jshint/blob/master/jshint.js#L253
        asi: false, // automatic semicolon insertion not allowed
        boss: false, // advanced usage of assignments not allowed
        eqnull: false, // == null comparisons not allowed
        evil: false, // eval not allowed
        expr: false, // expression statements not allowed
        indent: 2, // two spaces for indenting required
        loopfunc: false, // functions within loops not allowed
        regexdash: false, // unescaped first/last dash (-) inside brackets not allowed
        shadow: false, // variable shadowing not allowed
        strict: true, // 'use strict'; in functions required
        supernew: false, // `new function () { ... };` and `new Object;` not allowed
        sub: false, // all forms of subscript not allowed
        trailing: true, // trailing whitespace not allowed
        white: true // Crockford's whitespace rules required
      }
    },
    lint: {
      gruntfile: {
        options: '<config:jshint>',
        src: 'gruntfile.js'
      },
      library: {
        options: '<config:jshint>',
        src: 'library/**/*.js'
      },
      tasks: {
        options: '<config:jshint>',
        src: 'tasks/**/*.js'
      },
      test: {
        options: {
          options: '<config:jshint.options>',
          globals: {
            module: false, // QUnit
            ok: false, // QUnit
            setup: false, // QUnit
            strictEqual: false, // QUnit
            test: false // QUnit
          }
        },
        src: 'test/**/*.test.js'
      }
    },
    qunit: {
      files: 'test/**/*.html'
    },
    concat: {
      options: {
        banner: '<config:banner>'
      },
      dist: {
        src: ['<file_strip_banner:library/<%= pkg.name %>.js>'],
        dest: 'distribution/<%= pkg.name %>.js'
      }
    },
    min: {
      options: {
        banner: '<config:banner>'
      },
      dist: {
        src: ['<config:concat.dist.dest>'],
        dest: 'distribution/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      gruntfile: {
        files: '<config:lint.gruntfile.src>',
        tasks: ['lint:gruntfile']
      },
      examples: {
        files: 'examples/**/*.html',
        tasks: ['reload']
      },
      library: {
        files: '<config:lint.library.src>',
        tasks: ['lint:library', 'qunit', 'reload']
      },
      stylus: {
        files: 'library/<config.pkg.name>.styl',
        tasks: ['stylus', 'reload']
      },
      test: {
        files: ['<config:lint.test.src>', '<config:watch.examples.files>'],
        tasks: ['lint:test', 'qunit', 'reload']
      }
    },
    server: {
      base: '.',
      port: 3000
    },
    reload: {
      port: 35729,
      livereload: true
    }
  });

  grunt.unregisterTasks('init');
};
