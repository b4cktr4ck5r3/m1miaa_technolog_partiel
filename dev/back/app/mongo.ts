//====================================
// mongo.ts
//====================================

/** Imports */
import { Mongoose } from 'mongoose';

/** Mongoose instance */
const db = new Mongoose();

/* Database connection */
db.connect('mongodb://partiel_db:27017', {
    auth: {user: "partiel", password:"partiel"},
    dbName: "partiel",
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


/** Schema */
const testSchema = new db.Schema({
    name: String,
});

/** Model */
const testModel = db.model("Test", testSchema, "Test");

/**
 * Add new entry in mongo
 * 
 * @param name property value
 * @returns Promise<boolean>
 */
export async function addNewEntry(name:string):Promise<boolean>{
    const document = await testModel.create({name:name});

    if (document) return true;
    else return false;
}