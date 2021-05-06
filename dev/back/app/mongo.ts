import { Mongoose } from 'mongoose';

const db = new Mongoose();

db.connect('mongodb://partiel_db:27017', {
    auth: {user: "partiel", password:"partiel"},
    dbName: "partiel",
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const testSchema = new db.Schema({
    name: String,
});

const testModel = db.model("Test", testSchema, "Test");

export function createNewEntry(name:string){
    const instance = new testModel({
        name:name
    });

    instance.save((err, result) => {
        if (err){
            console.log(err);
        } 
        else {
            console.log(result);
        }
    });
}