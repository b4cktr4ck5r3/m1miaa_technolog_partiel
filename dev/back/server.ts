//====================================
// server.ts
//====================================

/** Imports */
import express from 'express';
import { type } from 'os';
import { stringify } from 'querystring';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { IPizza, addNewPizza, getPizzas } from './app/mongo';
import cors from 'cors';

/** Express instance */
const app = express();
const port = 3000;

/** Server configuration */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

/**
 * HTTP : [GET]
 * Return version of API
 */
app.get('/version', (req:express.Request, res:express.Response) => {
    res.status(200).json({version:1.0});
});

/**
 * HTTP : [GET]
 * Return pizza collection
 */
app.get('/pizzas', (req:express.Request, res:express.Response) => {
    getPizzas()
    .then((result) => {
        if (result) return res.status(200).json(result);
        else return res.status(400).json({message:"Something went wrong, no collection found"});
    });
});

/**
 * HTTP : [POST]
 * Add new pizza document
 */
app.post('/pizzas/add', (req:express.Request, res:express.Response) => {
    // Check for bad request
    if ((!req.body.name || typeof req.body.name !== "string")
        || (!req.body.desc || typeof req.body.desc !== "string")
        || (req.body.keywords && !Array.isArray(req.body.keywords))
        || (!req.body.deliveryTime && typeof req.body.deliveryTime !== "number"))
        res.status(400).json({message:"Bad request body"});
    // Perform logic
    else{
        // Build pizza
        const pizza : IPizza = {
            name: req.body.name,
            desc: req.body.desc,
            keywords: req.body.keywords,
            deliveryTime: req.body.deliveryTime
        }

        // Persist pizza
        addNewPizza(pizza)
        .then((result) =>{
            if (result) return res.status(200).json({message:"Good request, entry added"});
            else return res.status(400).json({message:"Something went wrong, entry not added"});
        })
        .catch((err) => {
            console.log(`Error : ${err}`);
        });
    }
})

/** Running server */
app.listen(port, () =>{
    console.log(`App listening at http://localhost:${port}`)
});