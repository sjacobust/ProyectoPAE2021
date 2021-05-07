const MongoClient = require("mongodb").MongoClient;
const dotenv = require('dotenv');

dotenv.config();

const mongoUrl = process.env.MONGO_URL;

let isConnecting = false;
let db;


class Database {


    db;
    collectionName;

    constructor() {

        if (isConnecting) return;

        isConnecting = true;

        MongoClient.connect(mongoUrl, {
            useUnifiedTopology: true
        }, (err, client) => {
            if (err) {
                console.log("Failed to connect to MongoDB");
                return;
            }
        
            db = client.db();
            console.log("Successfuly connected to MongoDB");
        });

        setTimeout(() => {
            console.log('Database connection timeout', db);
        }, 2000);
    }

    findOne(filters, cb) {
        const collection = db.collection(this.collectionName);
        return collection.find(filters).toArray(cb);

    }

    find(filters, limit, cb) {
        const collection = db.collection(this.collectionName);
        limit = limit || 30;
        return collection.find(filters).limit(limit).toArray(cb);
    }

    findAll(limit, cb) {
        const collection = db.collection(this.collectionName);
        limit = limit || 30;
        return collection.find({}).limit(limit).toArray(cb);
    }

    insertOne(document) {
        const collection = db.collection(this.collectionName);
        return collection.insertOne(document);
    }

    useCollection(collectionName) {
        this.collectionName = collectionName;
    }

    updateOne(filter, data) {
        const collection = db.collection(this.collectionName);
        return collection.updateOne(filter, data, { writeConcern: true });
    }

    deleteOne(filter) {
        const collection = db.collection(this.collectionName);
        return collection.deleteOne(filter)
    }

}

module.exports = Database;