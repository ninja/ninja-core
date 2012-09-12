var
  path = require('path'),
  stylus = require('stylus'),
  nib = require('nib');

module.exports = function style(buffer, response) {
  stylus(buffer)
    .use(nib())
    .import('nib')
    .import(path.resolve(__dirname, '../../../library/ninja-code'))
    .import(path.resolve(__dirname, '../../../library/ninja-table'))
    .import(path.resolve(__dirname, '../../../library/ninja-documentation'))
    .import(path.resolve(__dirname, '../../../library/ninja-qunit'))
    .set('force', true)
    .set('compress', true)
    .render(function (error, style) {
      if (error) {
        console.log(error.message);
        response.render('<pre>' + error.message + '</pre>')
      } else {
        if ('locals' in response) {
          response.locals.style = style;
        } else {
          response(style);
        }
      }
    });
}

