var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    dataBase = require('../database/database.json');

const port = 3000;
const app = express();

app.use(bodyParser.json());

app.use(express.static('./'));

app.get('/articles', (req, res)=>{
    res.send(dataBase);
});


app.use('/',  (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Express on port", port);
});
