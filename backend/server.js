import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passOP';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

client.connect();

// Get all passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// Save a password
app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const insertResult = await collection.insertOne(password);
  res.json({ success: true, result: insertResult });
});

// Delete a password
app.delete('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const deleteResult = await collection.deleteOne(password);
  res.json({ success: true, result: deleteResult });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


