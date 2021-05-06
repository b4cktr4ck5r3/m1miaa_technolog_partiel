import express from 'express';
import { createNewEntry } from './app/mongo';

const app = express();
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/version', (req:express.Request, res:express.Response) => {
    res.status(200).json({version:1.0});
});

app.post('/create', (req:express.Request, res:express.Response) => {
    if(!req.body.name)
        res.status(400).json({message:"Bad request body"});
    else{
        createNewEntry(req.body.name);
    }
})

app.listen(port, () =>{
    console.log(`App listening at http://localhost:${port}`)
});