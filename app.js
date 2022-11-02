const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended : false}));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set View engine and view for rendering .ejs template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));

// Route handling
const sellerRoutes = require('./routes/sellerRoutes.js');
const authRoutes = require('./routes/authenticationRoutes.js');
app.use(sellerRoutes);
app.use(authRoutes);

// App starts listening after database connection successfully made 
const connect_db = require('./services/connect_database');
connect_db.mongoConnect(()=>{
    app.listen(3001, (err) => {
        if (err)
            throw err;
        console.log("Server is listening(3001)...");
    })
})