import {MongoClient, ServerApiVersion} from 'mongodb';

import fs from 'fs';

 // 7qPtgZf90Od1rLqM

// export default async function connectDB() {
//     const url =
//         "mongodb://pbnbad:Dbpass12@docdb-2024-05-05-03-35-25.cluster-ch8sos60m4xi.us-east-2.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false";
//
//     try {
//         //
//         // const sslOptions = {
//         //     ssl: true,
//         //     sslValidate: true,
//         //     sslCA: fs.readFileSync('global_bundle.pem')
//         // };
//
//
//         const client = new MongoClient.connect(url, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             tlsCAFile: `global-bundle.pem`,
//             // ...sslOptions
//         });
//
//
//         console.log(`Database connected: ${url}`);
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
//     const dbConnection = mongoose.connection;
//     return;
// }

// const s = "mongodb://pbnbad:<insertYourPassword>@docdb-2024-05-05-03-35-25.cluster-ch8sos60m4xi.us-east-2.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false"





// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sgnanuhya:7qPtgZf90Od1rLqM@cluster1.marpisi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";


// mongodb+srv://sgnanuhya:<password>@cluster1.marpisi.mongodb.net/
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export default async function connectDB() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
connectDB().catch(console.dir);
