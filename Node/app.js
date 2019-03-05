// ==================== EXTERNAL IMPORTS ==================== //
const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// ==================== INTERNAL IMPORTS ==================== //

// ==================== GLOBAL VARIABLES ==================== //

const app = express();

// ==================== MIDDLEWARE ==================== //

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// parse post requests to body
app.use(bodyParser.json({ limit: '50mb' }));
// 50mb so it accepts base64 encoded images sent via POST
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// serving static files
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// ==================== FUNCTIONS ==================== //

// returns the full path of the passed view
const getViewPath = view => path.join(__dirname, `views/${view}/${view}.html`);

// ==================== ROUTES ==================== //

app.post('/crachas', (req, res) =>{
    fs.writeFile(`./crachas/${req.body.image.index}.JPEG`, req.body.image.data.replace(/^data:image\/png;base64,/, ""), 'base64', function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 
    res.send('ok');
});

// ==================== RENDER VIEWS ==================== //

app.get('/', (req, res) => {
    res.sendFile(getViewPath('home'));
});

// ==================== START SERVER ==================== //

app.listen(process.env.PORT || 3000, () => {
    console.log('READY');
});

// ====================================================== //
