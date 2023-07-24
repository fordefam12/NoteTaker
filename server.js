const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const { v4: uuidv4 } = require("uuid");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) res.send(err);
    else {
      res.send(JSON.parse(data));
    }
  });
});
app.get("*", (req,res)=> res.sendFile(path.join(__dirname, "/public/index.html")));


app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) res.send(err);
    else {
      let readData = JSON.parse(data);
      let newNote = req.body;
      (newNote.id = uuidv4()), console.log(newNote);
      readData.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(readData), (err) => {
        if (err) res.send(err);
        else {
          res.send("saved To File");
        }
      });
    }
  });
  // console.log(req.body);
});
app.delete(`/api/notes/:id`, (req, res) => {
  let id = req.params.id;
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) res.send(err);
    else {
      let readData = JSON.parse(data);
      let newInfo = readData.filter((element) => {
        if (element.id !== id) {
          return element;
        }
      });
      fs.writeFile("./db/db.json", JSON.stringify(newInfo), (err) => {
        if (err) res.send(err);
        else {
          res.send("note deleted");
        }
      });
    }
  });
});


app.listen(PORT, () => console.log(`listening to ${PORT}`));
