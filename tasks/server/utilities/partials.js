var
  sugar = require('sugar'),
  fs = require('fs'),
  handlebars = require('handlebars'),
  path = require('path');

module.exports = function partials(name, render) {
  var partials = [];

  function parse(pathRelative, done) {
    var pathFull = path.resolve(__dirname, '../views', pathRelative);

    if (fs.existsSync(pathFull)) {
      fs.readdir(pathFull, function (error, files) {
        if (error) {
          throw error;
        }

        files.findAll(/^\_/).forEach(function (file) {
          partials.add({
            name: /_([^.]+)\.[^.]+$/.exec(file)[1],
            pathFull: path.resolve(pathFull, file),
            pathRelative: path.join(pathRelative, file)
          });
        });

        done();
      });
    } else {
      done();
    }
  }

  parse('.', function () {
    parse(name, function () {
      partials.forEach(function (partial) {
        handlebars.registerPartial(partial.name, fs.readFileSync(partial.pathFull, 'utf8'));
      });

      console.log('partials:', partials.map(function (partial) {
        return partial.pathRelative;
      }).join(', '));

      render();
    });
  });
};
