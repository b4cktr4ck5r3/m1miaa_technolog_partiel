//====================================
// server.ts
//====================================

/** Imports */
import express from 'express';
import { type } from 'os';
import { stringify } from 'querystring';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { IPizza, addNewPizza, getPizzas, deletePizza, getPizza, updatePizza } from './app/mongo';
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
    // Simple security check
    if(!req.query.name){
        // Perfom get all pizza logic
        getPizzas()
        .then((result) => {
            if (result) return res.status(200).json(result);
            else return res.status(400).json({message:"Something went wrong, no collection found"});
        });
    } else{
        // Perform get one pizza logic
        getPizza(req.query.name as string)
        .then((result) => {
            if (result) return res.status(200).json(result);
            else return res.status(400).json({message:"Something went wrong, no pizza found"});        
        });
    }
});

/**
 * HTTP : [POST]
 * Add new pizza document
 */
app.post('/pizzas/add', (req:express.Request, res:express.Response) => {
    // Simple security check
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

        // Perfom add logic
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

/**
 * HTTP : [DELETE]
 * Delete a pizza document
 */
app.delete('/pizzas/del', (req:express.Request, res:express.Response) => {
    // Simple security check
    if(!req.query.name) return res.status(400).json({message:"No pizza to delete"});
    // Perform delete logic
    else deletePizza(req.query.name as string)
        .then((result) =>{
            if (result) return res.status(200).json({message:"Entry deleted"});
            else return res.status(400).json({message:"Something went wrong, entry not deleted"});
        });
});

/**
 * HTTP : [PUT]
 * Edit a pizza document
 */
 app.put('/pizzas/edit', (req:express.Request, res:express.Response) => {
    if(!req.query.name) return res.status(400).json({message:"No pizza to edit"});
    else{
        // TODO edit this uggly code, no time for this now.
        let props:any = {};
        if (req.body.name)
            props["name"] = req.body.name;

        if (req.body.desc)
            props["desc"] = req.body.desc;
        
        if (req.body.keywords)
            props["keywords"] = req.body.desc;
        
        if (req.body.deliveryTime)
            props["deliveryTime"] = req.body.deliveryTime;

        // Perform edit logic
        updatePizza(req.query.name as string, props)
        .then((result) => {
            if (result) return res.status(200).json({message:"Entry edited"});
            else return res.status(400).json({message:"Something went wrong, entry not edited"});
        })
    }
});

/** Running server */
app.listen(port, () =>{
    console.log(`App listening at http://localhost:${port}`)
});