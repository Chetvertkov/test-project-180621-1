import express from 'express'
const exec = require('child_process').exec;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const PORT = 5000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const specs = require('../specs.json')
console.log(specs)

import mongoose = require("mongoose");
const uuid = require('uuid');

import {logEntity} from "./models/logEntity";

app.get('/config', (req, res) => {
    res.status(200).send({
        name:specs.name,
        title:specs.title,
        description:specs.description,
        parameters:specs.parameters
    })
});

app.post('/run',(req,res)=>{
    const input_num:string = req.body.input_num
    const input_text:string = req.body.input_text
    console.log(req.body)

    //Run bash script
    exec(`./start.sh ${input_num} ${input_text}`,(error:any, stdout:any, stderr:any) => {
        let serverOutput = ''
        if(stderr){
            console.log(stderr)
            serverOutput = stderr
        }else{
            console.log(stdout)
            serverOutput = stdout

        }

        let entity = new logEntity({
            _id:uuid.v4(),
            timestamp:Date.now(),
            input_data:req.body,
            output_data:serverOutput
        })
        entity.save((err:any,doc:any)=>{
            console.log(err)
            console.log(doc)
            res.send({scriptData:serverOutput})
        })

    });


})

app.get('/logs',async (req,res)=>{
    const logs = await logEntity.find({}).sort({timestamp:-1})
    res.json({logs:logs})
})


// app.listen(PORT, () => {
//     console.log(`️[server]: Server is running at http://localhost:${PORT}`)
// });

async function start(){
    try {
        await mongoose.connect(`mongodb://${process.env.MONGO_DB_ADDR}:${process.env.MONGO_DB_PORT}/testdb`, {useNewUrlParser: true, useUnifiedTopology: true});

        app.listen(PORT,()=>{console.log(`[server]: Server is running at http://localhost:${PORT}`)});

    }catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}


start();