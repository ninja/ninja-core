module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('test', [
    'server',
    'qunit'
  ]);
};
