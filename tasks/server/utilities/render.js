var partials = require('./partials');

module.exports.render = function (name, response, locals) {
  partials(name, function () {
    response.render(name, locals);
  });
};
