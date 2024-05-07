import mongoose from "mongoose";

export default function connectDB() {
    const url =
        "mongodb+srv://sgnanuhya:7qPtgZf90Od1rLqM@cluster1.marpisi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
    const dbConnection = mongoose.connection;
    dbConnection.once("open", (_) => {
        console.log(`Database connected: ${url}`);
    });

    dbConnection.on("error", (err) => {
        console.error(`connection error: ${err}`);
    });
    return;
}