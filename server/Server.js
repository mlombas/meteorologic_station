let {Server, App} = require('./mocomaServer.js');
let {PASSWORD} = require('./secrets.js');

let {
    storeMeteomoment,
    retrieveMeteomoment,
    retrieveRange,
} = require('./storage.js');

//Server

let mainServer = new Server(
    new App(
        /\/data/,
        (res, path, query, req) => { //TODO
            console.log(req.method);
            res.end('Hello there');
        },
        'Method not allowed',
        'GET',
    ),
    new App(/\/log/, () => {}, 'Method not allowed', 'GET'), //TODO
    new App(/^\/$/, () => {}, 'Webpage only allows GET', 'GET'), //TODO
);
mainServer.setUniqueFuncToMethod('POST', (req, res) => {});

mainServer.start('8080');

function linearInterpolation(a, b, p) {
    return a + (b - a) * p;
}
function log(section, data) {} //TODO move to a new distinct file also
