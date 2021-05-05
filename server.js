if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

var cors = require('cors')
app.use(cors({
    origin: 'https://pay-it-forward-chat.herokuapp.com'
}))
 
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)

const server = app.listen(process.env.PORT || 'https://pay-it-forward-chat.herokuapp.com', () => {
    console.log("Server is listening on port https://pay-it-forward-chat.herokuapp.com")
})

const io = require("socket.io")(http, {
    cors: {
        origin: "https://pay-it-forward-chat.herokuapp.com",
        methods: ["GET", "POST"]
    }
})
http.listen('https://pay-it-forward-chat.herokuapp.com')

io.on('connection', (socket) =>{
    console.log("A new client has been connected");

socket.username = "Anonymous";

    socket.on('new_message',(data) => {
        io.sockets.emit('new_message', {
            message: data.message,
            username: socket.username
        });

    socket.on("change_username", data =>{
        socket.username = data.username;
    });

    socket.on("typing", (data)=>{
        socket.broadcast.emit("typing",{username:socket.username});
    });
    });
});