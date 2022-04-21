const express = require('express')
//parse arguments from request body with body-parser
const bodyParser = require('body-parser')

const path = require('path')
//connect to mongodb 
const { MongoClient } = require("mongodb");

const PORT = process.env.PORT || 5000

//get the uri from environment variables
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });
const database = client.db('415Phase2EMR');
const emrs = database.collection('emr');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

  //get all api
  .get('/emr', async (req, res) => {
    try {
      await client.connect();
      //empty query to get everything
      const query = {};

      const cursor = emrs.find({})
      const result = await cursor.toArray();
      res.send(JSON.stringify(result));
    } catch (err) {
      console.log(err);
    }
    finally {
      await client.close();
    }
  })

  //get by id api
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

  //use bodyparser to parse arguments
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())

  //post api
  .post('/emr', async (req, res) => {
    try {
      await client.connect();

      //get the last id and add 1, then convert that id to string
      const cursor = emrs.find().sort({ _id: -1 }).limit(1)
      last_record = await cursor.toArray()
      new_id = (Number(last_record.id) + 1).toString(10)

      //create the new record with the updated id and information from request body
      new_record = {
        "id": new_id,
        "name": req.body.name,
        "dob": req.body.dob,
        "medications": req.body.medications
      }

      //check if fields are empty
      if (new_record.name && new_record.dob && new_record.medications) {
        await emrs.insertOne(new_record)
        res.sendStatus(200)

      } else
        // if empty fields, send bad request
        res.sendStatus(400)

    } catch (err) {
      console.log(err);
    }
    finally {
      await client.close();
    }
  })

  //delete api
  .delete('/emr/:id', async (req, res) => {
    try {
      await client.connect();
      const query = { "id": req.params.id };

      //check if the emr actually exists
      const emr = await emrs.findOne(query);
      if (emr) {
        //if emr exists, delete it and send OK
        const result = await emrs.deleteOne(query);
        res.send(result.acknowledged);
      }

      //if emr doesn't exist, send false for not deleted
      res.send(false);
    } catch (err) {
      console.log(err);
    }
    finally {
      await client.close();
    }
  })

  //put update
  .put('/emr/:id', async (req, res) => {
    try {
      await client.connect();
      const query = { "id": req.params.id };

      //get the record
      const emr = await emrs.findOne(query);
      new_record = {
        "name": req.body.name,
        "dob": req.body.dob,
        "id": req.params.id,
        "medications": req.body.medications
      }

      //check if the fields are empty or if the emr with the id exists
      if (new_record.name && new_record.dob && new_record.medications && emr) {

        //everything is fine, so update the record
        await emrs.updateOne(query, { '$set': new_record }, { upsert: false })
        res.sendStatus(200)
      } else

        //something has gone wrong, so send bad request
        res.sendStatus(400)
    } catch (err) {
      console.log(err);
    }
    finally {
      await client.close();
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
