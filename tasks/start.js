module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('start', [
    'stylus',
    'lint',
    'server',
    'qunit',
    'dox',
    'watch'
  ]);
};
