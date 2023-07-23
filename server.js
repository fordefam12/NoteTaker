const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"/public/index.html"))
});


app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname,"/public/notes.html"))
});


app.get('/api/notes', (req,res)=> {
    fs.readFile("./db/db.json","utf-8", (err, data) => {
        if (err) res.send (err)
        else{
            res.send(JSON.parse(data))
        }
    } )
}) 


















app.listen(PORT, ()=>
console.log(`listening to ${PORT}`))