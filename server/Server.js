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
        (res, path, query, req) => {
            if (req.method == 'POST') {
                let data = '';
                req.on('data', chunk => {
                    data += chunk.toString();
                }).on('end', () => {
                    let meteomoment = JSON.parse(data);
                    let date = new Date();
                    storeMeteomoment(date, meteomoment);

                    res.end()
                });
            } else if (req.method == 'GET') {
                res.end("hey");
                //TODO
            }
        },
        'Method not allowed',
        'GET',
        'POST',
    ),
    new App(/\/log/, () => {}, 'Method not allowed', 'GET'), //TODO
    new App(/^\/$/, () => {}, 'Webpage only allows GET', 'GET'), //TODO
);

mainServer.start('80');

function log(section, data) {} //TODO move to a new distinct file also
