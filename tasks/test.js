module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('test', [
    'stylus',
    'lint',
    'server',
    'qunit'
  ]);
};
