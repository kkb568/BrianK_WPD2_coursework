const express = require('express');
const app = express();

const path = require('path');
const pages = path.join(__dirname,'pages');
app.use(express.static(pages));
app.use(express.urlencoded({extended:false}));

const mustache = require('mustache-express');
app.engine('mustache',mustache());
app.set('view engine','mustache');

const router = require('./appRoutes/appRoutes')
app.use('/',router);

app.listen(3000, () => {
    console.log("Application running on port 3000. Press 'ctrl^c' to quit");
});