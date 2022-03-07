const express = require('express')
const path = require('path')
var data = require('./data/emr.json')
// import * as data from "data/emr.json"
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/emr', (req, res) => res.send(JSON.stringify(data)))
  .post('/emr', (req, res) => {
    req.body;
    res.send(req.body);
  })
  .get('/emr/:id', (req, res) => {
    const id = req.params.id;
    res.send(JSON.stringify(data[id - 1]))
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}` + data))
