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
    const productCollection = client.db("EdokanDb").collection("product")
    const usersCollection = client.db("EdokanDb").collection("users")


    //collection api
    app.get('/collection', async(req,res) => {
        const result = await serviceCollection.find().toArray()
        res.send(result)
      })

      //product api
      app.get('/product', async(req,res)=> {
        const result = await productCollection.find().toArray()
        res.send(result)
      })

      //user api

      app.put('/users/:email', async(req,res) => {
        const email = req.params.email
        const user = req.body
        const query = {email: email}
        const options = {upsert: true}
        const isExist = await usersCollection.findOne(query)
        console.log('User', isExist);
        if(isExist) return res.send(isExist)
        const result = await usersCollection.updateOne(
          query, {
            $set: {...user, timestamp: Date.now}
          },
          options
          )
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
    console.log(`edokan is running on ${port} `);
})



