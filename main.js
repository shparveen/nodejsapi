const express    = require("express");
const apis 	   = require('./routes/loginroutes');
const bodyParser = require('body-parser');
const session	   = require('express-session');
const path 	   = require('path');

const app = express();


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const router = express.Router();

// test route
/*router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});*/

router.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
});


//route to handle user registration
router.post('/register',apis.register);
router.post('/login',apis.login);

router.get('/longestCrawl',apis.longestCrawl);
router.get('/mostAppearCharacter',apis.mostAppearCharacter);
router.get('/starWarsSpecies',apis.starWarsSpecies);
router.get('/planetVehiclePilotsDetail',apis.planetVehiclePilotsDetail);


app.use('/api', router);
app.listen(9003);
