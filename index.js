let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let Datastore = require('nedb');
let db= new Datastore('boba.db');
db.loadDatabase();

app.use(bodyParser.json());

let bobaTracker = [];

// app.get('/', (req,res)=>{
//     res.send('this is the main page');
// })

//2. add a route on server, that is listening for a post request
app.post('/noCups', (req,res)=>{
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        boba: req.body.number
    }
    //insert boba data into the database
    db.insert(obj,(err, newDocs)=>{
        if(err){
            res.json({task:"task failed"});
        }else{
            res.json({task:"success"});
        }
        //console.log('new document inserted');
        //res.json({task:"success"});
    })
    //bobaTracker.push(obj);
    //console.log(bobaTracker);
    //res.json({task:"success"});
})

app.use('/', express.static('public'));

//add route to get all coffe track info
app.get('/getCups', (req,res)=>{

    db.find({}, (err, docs)=> {
        if(err){
            res.json({task:"task failed"})
        }else{
            let obj = {data: docs};
            res.json(obj);
        }
        //console.log(docs);
    
    })
})

//listen at port 5000
app.listen(3000, ()=> {
    console.log('listening at locoalhost:3000');
})