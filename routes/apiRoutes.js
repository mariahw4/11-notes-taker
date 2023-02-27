const fs = require("fs");
const db = require("../db/db.json");

module.exports = app => {
function getNotes() {
    let data = fs.readFileSync('./db/db.json', 'utf8');

    let notes = JSON.parse(data);

    // Give each note an ID that matches its index (this gets run for every time the page is refreshed)
    for (let i = 0; i < notes.length; i++) {
        notes[i].id = '' + i;
    }

    return notes;
}

app.get("/api/notes", (req, res) => {
    noteInfo = getNotes();
    res.json(noteInfo);
})

app.post("/api/notes", (req, res) => {
    noteInfo.push(req.body);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteInfo), 'utf8');
    res.json(true);
})

app.delete("/api/notes/:id", (req, res) => {
    const reqID = req.params.id;
    console.log(reqID);

    let note = noteInfo.filter(note => {
        return note.id === reqID;
    }) [0];

    console.log(note);
    const index = noteInfo.indexOf(note);

    noteInfo.splice(index, 1);

    fs.writeFileSync("./db/db.json", JSON.stringify(noteInfo), "utf-8");
    res.json("Note Deleted");

});

}