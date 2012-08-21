var socket = io.connect('http://localhost:3000');

socket.on('reload', function (message) {
  console.log(message);

  window.document.location.reload();
});

socket.on('restyle', function (style, message) {
  console.log(message);

  _$('#style').html(style);
});
