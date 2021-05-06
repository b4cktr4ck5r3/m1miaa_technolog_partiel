import express from 'express'

const app = express();
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/version', (req:express.Request, res:express.Response) => {
    res.status(200).json({version:1.0});
});

app.listen(port, () =>{
    console.log(`App listening at http://localhost:${port}`)
});