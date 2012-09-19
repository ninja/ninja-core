module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('default', [
    'stylus',
    'jshint',
    'server',
    'qunit',
    'concat',
    'version',
    'uglify'
  ]);
};
