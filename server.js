const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
})

app.use(
  favicon(path.join(__dirname, '../public', 'favicon.ico'))
);

app.use(
  express.static(__dirname + '/public')
);

app.listen(process.env.PORT || 3000, function(error) {
  if (error) {
      console.error(error);
  } else {
      console.info('\nServer is on! \n \\ \/\n\ . \.\n  O');
  }
})
