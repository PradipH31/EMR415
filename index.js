const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { MongoClient } = require("mongodb");
const PORT = process.env.PORT || 5000

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });
const database = client.db('415Phase2EMR');
const emrs = database.collection('emr');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/emr', async (req, res) => {
    try {
      await client.connect();
      const query = {};
      const cursor = await emrs.find({})
      const result = await cursor.toArray();
      res.send(JSON.stringify(result));
      console.log(result)
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
  .get('/emr/:id', async (req, res) => {
    try {
      await client.connect();
      const query = { "id": req.params.id };
      const result = await emrs.findOne(query);
      res.send(JSON.stringify(result));
      // console.log(result)
    } catch (err) {
      console.log(err);
    }
    finally {
      await client.close();
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
