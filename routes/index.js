var bodyParser  = require("body-parser");


module.exports = (app, io, fs) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    fs.readFile('./public/index.html', null, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.write('File Not Found');
      } else {
        res.write(data);
      }
      res.end();
    });
  });

  app.post('/send', (req, res) => {
    io.sockets.emit('send', req.body.image);
    res.json({response: req.body.image});
  });
};