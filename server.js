const ghost = require('ghost');
ghost().then(function (ghostServer) {
  ghostServer.start();
});
