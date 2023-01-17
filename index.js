const express = require('express');
const port = 9000;
const app = express();
// for mongoDB data base connection setup
const db= require("./config/mongoose");
const MongoStore= require("connect-mongo");

// for creating session

const session = require('express-session');

app.use(express.urlencoded());

app.use(session({
    name: 'polling',
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge : (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/polling',
            mongooseConnection: db,
            autoRemove: false
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok')
        }
    )
}));




// use express router
app.use('/',require('./routes'));

// port listening on port

app.listen(port,function(err){
    if(err){
        console.log(`Error in connection the database ${err}`);
        return;
    }
    console.log(`Server is running at the port ${port}`);
})






//  creating question, localhost:9000/question/create          | in body , title = which cat do you love the most | then wait for response

// deleting question ,
//  creating the options to a question ,localhost:9000/question/63c62f585d17ea974cb74dbf/options/create  | in body , text = any option | then wait for the response


// for viewing a particular question with all options, localhost:9000/question/63c62f585d17ea974cb74dbf  | in body nothing should  be present there | just send req and wait


// deleting a particular option
// for adding vote to particular option, localhost:9000/option/63c637a55d17ea974cb74dee/add_vote
