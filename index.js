// imports
import express from "express";
import messages from "./messages.js";
import fs from 'fs'; //import * as fs from "node:fs";
import path from "path";

// init app
const PORT = 4000;
const app = express();

// memory store
const keyvalmap = new Map();

// file write
const __dirname = path.resolve();
var writepath = path.join(__dirname, 'test.txt');

fs.appendFile(writepath, "\ntest text\n", function (err) {
	if (err) {
		return console.error(err);
	}

	console.log("Data appended successfully!");
	console.log("Let's read newly written data");

	fs.readFile(writepath, function (err, data) {
		if (err) {
			return console.error(err);
		}
		console.log("Asynchronous read: " + data.toString());
	});
});

// routing path
app.get('/', (req, res) => {
	res.send(messages.home)
});

app.get('/get', (req, res) => {
    console.log(`get key value`);
    for (const key in req.query) {
        console.log(key, keyvalmap.get(key));
	    res.send(`[Gotten] Key: ${key}; Value: ${keyvalmap.get(key)}\n`)
    };
});

// post handlers
app.post('/set', (req, res) => {
    console.log(`set key value using post`);
    for (const key in req.query) {
        console.log(key, req.query[key]);
        keyvalmap.set(key, req.query[key]);
	    res.send(`[Setted using POST] Key: ${key}; Value: ${keyvalmap.get(key)}\n`)
    };
});

// put handlers
app.put('/set', (req, res) => {
    console.log(`set key value using put`);
    for (const key in req.query) {
        console.log(key, req.query[key]);
        keyvalmap.set(key, req.query[key]);
	    res.send(`[Setted using PUT] Key: ${key}; Value: ${keyvalmap.get(key)}\n`)
    };
});

// start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// error handling
app.use((req, res) => {
    res.status(404).send(messages.notFound);
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Went Wrong!');
});
