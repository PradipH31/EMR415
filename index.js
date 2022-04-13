const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { MongoClient } = require("mongodb");
const PORT = process.env.PORT || 5000
const uri = process.env.MONGODB_URI;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/emr', async function (req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
      await client.connect();

      const database = client.db('415Phase2EMR');
      const emrs = database.collection('emr');


      await emrs.find({}).toArray(function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result));
      });

    } catch (err) {
      console.log(err);
    }
    finally {
      await client.close();
    }
  })
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  // .post('/emr', (req, res) => {
  //   new_record = {
  //     "id": data.length + 1,
  //     "name": req.body.name,
  //     "email": req.body.email,
  //     "gender": req.body.gender,
  //     "phone": req.body.phone,
  //     "address": req.body.address
  //   }
  //   if (new_record.name && new_record.email && new_record.gender && new_record.phone && new_record.address) {
  //     data.push(new_record)
  //     console.log(new_record)
  //     res.sendStatus(200)
  //   } else
  //     res.sendStatus(400)
  // })
  // .get('/emr/:id', (req, res) => {
  //   const id = req.params.id;
  //   res.send(JSON.stringify(data[id - 1]))
  // })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
