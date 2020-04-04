const express = require('express');
const app = express();
const path = require('path');

const server = app.listen(8000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.use(express.static(__dirname + '/client'));