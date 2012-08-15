var fs = require('fs');

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*!\n' +
        '<%= pkg.name %> <%= pkg.version %>\n' +
        '<%= pkg.homepage %>\n' +
        'Copyright 2008-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
        'Licensed per the terms of the <%= pkg.licenses[0].type %>\n' +
        '<%= pkg.licenses[0].url %>\n' +
        '*/'
    },
    stylus: {
      compile: {
        options: {
          compress: true
        },
        files: {
          'distribution/<%= pkg.name %>.css': ['library/*.styl']
        }
      }
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:library/<%= pkg.name %>.js>'],
        dest: 'distribution/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'distribution/<%= pkg.name %>.min.js'
      }
    },
    server: {
      base: '.',
      port: 8000
    },
    qunit: {
      files: ['http://localhost:8000/test']
    },
    dox: {
      files: ['library/<%= pkg.name %>.js'],
      dest: 'documentation'
    },
    reload: {
      port: 3000,
      proxy: {
        host: 'localhost',
        port: 8000
      }
    },
    watch: {
      files: ['library/**/*.js', 'library/**/*.styl', 'test/**/*.js', 'test/**/*.html', 'examples/**/*.html'],
      tasks: 'stylus lint qunit reload'
    },
    lint: {
      files: ['grunt.js', 'library/**/*.js', 'test/**/*.test.js']
    },
    jshint: {
      "passfail": false,
      "maxerr": 3,
      "debug": false,
      "devel": false,
      "browser": true,
      "node": true,
      "predef": [
        "after",
        "afterEach",
        "before",
        "beforeEach",
        "describe",
        "expect",
        "it"
      ],
      "es5": true,
      "strict": false,
      "globalstrict": true,
      "asi": false,
      "laxbreak": true,
      "bitwise": true,
      "boss": false,
      "curly": true,
      "eqeqeq": true,
      "eqnull": false,
      "evil": false,
      "expr": false,
      "forin": false,
      "immed": true,
      "latedef": true,
      "loopfunc": false,
      "noarg": true,
      "regexp": true,
      "regexdash": false,
      "scripturl": true,
      "shadow": false,
      "supernew": false,
      "undef": true,
      "indent": 2,
      "newcap": true,
      "noempty": true,
      "nonew": true,
      "nomen": true,
      "onevar": true,
      "plusplus": true,
      "sub": false,
      "trailing": true,
      "white": true,
      "nonstandard": true
    }
  });

  grunt.registerTask('dox', 'Generate JSON file under documentation from comments in the library files.', function () {
    var
      name = grunt.config.get('pkg').name,
      fileIn = 'library/' + name + '.js',
      fileOut = 'documentation/' + name + '.json';

    grunt.file.write(fileOut, JSON.stringify(require('dox').parseComments(grunt.file.read(fileIn)), null, 2));

    grunt.log.writeln('Created "' + fileOut + '" from "' + fileIn + '".');
  });

  grunt.loadNpmTasks(fs.existsSync('node_modules/grunt-contrib') ? 'grunt-contrib' : 'ninja/node_modules/grunt-contrib');

  grunt.loadNpmTasks(fs.existsSync('node_modules/grunt-reload') ? 'grunt-reload' : 'ninja/node_modules/grunt-reload');

  grunt.registerTask('default', 'stylus lint server qunit dox concat min');

  grunt.registerTask('develop', 'server reloadServer watch');
};
