const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var express = require('express');
var qwant = require("qwant-api");
var app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
//app.use('/public', express.static(process.cwd() + '/public'));

var db;

var mlab_username = 'nuhman7'; //your mlab username
var mlab_password = 'iamnuhman7'; //your mlab password
var appUrl = 'https://imagesearches7.herokuapp.com/'; //your app url with a trailing backslash.. example: https://nanos.herokuapp.com/
// mlab_url would be given to you upon registration in mlab.com
var mlab_url = 'mongodb://'+mlab_username+':'+mlab_password+'@ds127506.mlab.com:27506/espresso-cloud';


MongoClient.connect(mlab_url, (err, database) => {    
    if(err)  return console.log("error while CONNECTING!! " + err);
    console.log("connected to database!");
    
    db = database;
    
    app.get("/", (req, res) => {        
        var cursor = db.collection('imageSearch').find();
        cursor.toArray( (err, results) => {
            if(err) return console.log("error while getting DATA!! " + err);            
        });
        res.sendFile(process.cwd() + '/views/index.html');
    });
    
    app.get('/api/*', (req, res) => {
        var query = (req.originalUrl).slice(5);
        query = query.split('?')[0];
        var date = (new Date()).toISOString();  
        var off = 0;                        
        if(req.query.offset){            
            off = parseInt(req.query['offset']) + 1;
        }
        console.log(query);
        var save_data = {
            query: decodeURIComponent(query),            
            when: date
        };
        //res.json(save_data);             
        db.collection('imageSearch').save(save_data, (err, result) => {
            if(err) return console.log("error while uploading DATA!! " + err);
            console.log("saved to database successfully!");                                    
            qwant.search("images", { query: query, count: 10, offset: off, language: "english" }, function(err, data){
                if (err) return console.log(err);
                const items = data['data']['result']['items'];            
                var final = [];
                items.map(function(item){
                    final.push(
                        {
                            "image-url": item["media"],
                            "alt-text": item["title"],
                            "page-url": item["url"]
                        }
                    );
                });
                res.json(final);
            }); 
        });        
        
    });

    app.get('/latest/', (req, res) => {                
        db.collection('imageSearch').find({}, { _id: false, query: true, when: true }).sort({_id:-1}).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            res.json(result);
        });
    });            
    // Respond not found to all the wrong routes
    app.use(function(req, res, next){
        res.status(404);
        res.sendFile(process.cwd() + '/views/404.html');
    });
  
    // Error Middleware
    app.use(function(err, req, res, next) {
        if(err) {
        res.status(err.status || 500)
            .type('txt')
            .send(err.message || 'SERVER ERROR');
        }  
    });

   
    app.listen(process.env.PORT || 3000, function () {
        console.log('Node.js listening ...');
    });

});