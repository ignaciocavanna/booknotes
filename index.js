import bodyParser from "body-parser";
import express from "express"
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
    host: "localhost",
    user: "postgres",
    password: "postgreadmin",
    database: "booknotes",
    port: 5432,
})

db.connect()

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", async (req, res ) => {
    try {
        const notes = await db.query("SELECT * FROM notes");
        console.log(notes.rows);

        res.render("index.ejs",{
            notes: notes.rows
        })

    } catch (error) {
        console.error(error)        
    }
})

app.post("/bottom-bar", async (req, res) => {
    try {
        console.log(req.body);
        if ( req.body.bottomBar == 'home') {req.body.bottomBar = ''}
        res.redirect(`/${req.body.bottomBar}`);
    } catch (error) {
        console.error(error)
    }
})

app.get("/booknotes", async (req, res) => {
    res.render("booknotes.ejs")
})

app.get("/groups", async (req, res) => {
    res.render("groups.ejs")
})

app.get("/settings", async (req, res) => {
    res.render("settings.ejs")
})










app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });