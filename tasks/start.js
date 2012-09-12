module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('start', [
    'stylus',
    'jshint',
    'server',
    'qunit',
    'watch'
  ]);
};
