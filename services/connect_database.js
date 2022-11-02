const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let db;


const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://Viren:I0y6h6yb6lScL05M@e-cart-cluster.d3gbsxq.mongodb.net/?retryWrites=true&w=majority')
        .then(client => {
            db = client.db('E_Cart');
            console.log("Successfully connected with E_Cart database (MongoDB)!")
            callback();
        })
        .catch(err => {
            throw err;
        })
}

const getDB = ()=>{
    if(db)
        return db;
    return "Error : Database not found!"
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;