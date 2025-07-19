// imports
import express from "express";
import messages from "./messages.js";

// init app
const PORT = 4000;
const app = express();

// memory store
const keyvalmap = new Map();

// routing path
app.get('/', (req, res) => {
	res.send(messages.home)
});

app.get('/get', (req, res) => {
    console.log(`get key value`);
    for (const key in req.query) {
        console.log(key, keyvalmap.get(key));
	    res.send(`[Gotten] Key: ${key}; Value: ${keyvalmap.get(key)}`)
    };
});

// post handlers
app.post('/set', (req, res) => {
    console.log(`set key value`);
    for (const key in req.query) {
        console.log(key, req.query[key]);
        keyvalmap.set(key, req.query[key]);
	    res.send(`[Setted] Key: ${key}; Value: ${keyvalmap.get(key)}`)
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
