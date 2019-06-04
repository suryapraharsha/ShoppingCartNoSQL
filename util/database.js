const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect= callback =>{
    MongoClient.connect('mongodb+srv://surya:G67ip7pJVjaOuzZb@node-cluster-tjxes.mongodb.net/shop?retryWrites=true&w=majority',{ useNewUrlParser: true })
    .then(client=>{
        console.log('connected');
        _db = client.db();
        callback();
    })  
    .catch(err=>{
        console.log(err);
        throw err;
    });
}

const getDb = ()=>{
    if(_db){
        return _db;
    }
    throw 'databse not found';
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

