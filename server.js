const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/outreach-fms-dashboard'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname + '/dist/outreach-fms-dashboard/index.html'));
});
app.listen(3000);