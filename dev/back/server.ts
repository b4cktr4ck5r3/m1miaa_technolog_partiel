//====================================
// server.ts
//====================================

/** Imports */
import express from 'express';
import { type } from 'os';
import { stringify } from 'querystring';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { addNewEntry } from './app/mongo';
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
 * HTTP : [POST]
 * Add new document
 */
app.post('/create', (req:express.Request, res:express.Response) => {
    // Check for bad request
    if(!req.body.name || typeof req.body.name !== "string")
        res.status(400).json({message:"Bad request body"});
    // Perform logic
    else{
        addNewEntry(req.body.name)
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