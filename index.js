const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app =express();
const cors = require('cors')
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://edokan:kFI0stmCyja2Wfwx@cluster0.pdaizgq.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const serviceCollection = client.db("EdokanDb").collection("collection");
    app.get('/collection', async(req,res) => {
        const result = await serviceCollection.find().toArray()
        res.send(result)
      })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



  app.get('/', (req, res) => {
    res.send('edokan is running')
})

app.listen(port, () => {
    console.log(`edokan is running on ${port}`);
})

