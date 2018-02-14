import * as express from 'express';
import * as expresshandlebars from 'express-handlebars'
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import {ConfigService} from './config';
import {batchLogger} from './batchLogger';

// config init
var config = new ConfigService().value; 

// server setup
const app: express.Application = express();
app.use(json());
app.use(express.static(path.join(__dirname, './client')));

const exphbs: ExpressHandlebars = expresshandlebars;
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, './client'));
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 8001);

// base route
app.get('/', function(req: express.Request, res: express.Response){
    res.render('index', { cdn_path: config.cdnUrl, clientSettings: JSON.stringify(config.clientSettings)});
});

// logging route
const bLogger = new batchLogger(config);
app.post('/log', function(req: express.Request, res: express.Response){ 
    bLogger.log(req.body);
    res.status(204);
    res.end();
});

// this route should come at the end 
app.use(function(req: express.Request, res: express.Response){
    res.status(404).end('<h1>Page not found</h1>');
});

// listen (start app with node server.js) ======================================
app.listen(app.get('port'), function(){
    console.log('UOM app for '+ (config.isAdminApp && 'GE' || 'Org')  +'-Admin (version ' + config.appVersion + ') listening on port ' + app.get('port'));
});
