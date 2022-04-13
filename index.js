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
  .get('/emr/:id', async (req, res) => {
    try {
      await client.connect();
      const query = { "id": req.params.id };
      const result = await emrs.findOne(query);
      res.send(JSON.stringify(result));
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
  .post('/emr', async (req, res) => {
    try {
      await client.connect();
      old_id = await emrs.find().limit(1).sort({ $natural: -1 }).id
      console.log(old_id)
      new_id = old_id + 1
      new_record = {
        "id": new_id,
        "name": req.body.name,
        "dob": req.body.dob,
        "medications": req.body.medications
      }
      if (new_record.name && new_record.dob && new_record.medications) {
        await emrs.insertOne(new_record)
        res.sendStatus(200)
      } else
        res.sendStatus(400)
    } catch (err) {
      console.log(err);
    }
    finally {
      await client.close();
    }
  })
  .delete('/emr/:id', async (req, res) => {
    try {
      await client.connect();
      const query = { "id": req.params.id };
      const result = await emrs.deleteOne(query);
      res.send(result.acknowledged);
    } catch (err) {
      console.log(err);
    }
    finally {
      await client.close();
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
