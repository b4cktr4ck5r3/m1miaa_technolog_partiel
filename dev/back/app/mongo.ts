//====================================
// mongo.ts
//====================================

/** Imports */
import { model, Model, Mongoose, Document, Schema } from 'mongoose';

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

/** Definition of pizza object (document for mongo) */
export interface IPizza{
    name:string,
    desc:string,
    keywords:string[],
    deliveryTime:number
}

/** Pizza schema for document */
const PizzaSchema: Schema = new Schema({
    name: {type:String, required: true},
    desc: {type:String, required: true},
    keywords: {type:Array, required:false},
    deliveryTime: {type:Number, required:true}
});

/** Pizza model for mongo */
const PizzaModel = db.model('Pizza', PizzaSchema);

/**
 * Add new pizza in collection
 * 
 * @param pizza Pizza object
 * @returns Promise<boolean>
 */
export async function addNewPizza(pizza: IPizza){
    const document = await PizzaModel.create(pizza);

    if (document) return true;
    else return false;
}