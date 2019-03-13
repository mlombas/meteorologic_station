let urlParser = require('url').parse;
let queryParser = require('querystring').parse;

exports.Server = class {
    constructor(...apps) {
        this.router = new exports.AppRouter(apps);
        this.methods = {};

        this.server = require('http').createServer((req, res) => {
            if (req.method in this.methods) this.methods[req.method](req, res);

            let app = this.router.getApp(req.url);
            if (!app) {
                res.writeHead(400);
                res.end('App not found');

                return;
            }

            app.do(req, res);
        });
    }

    setUniqueFuncToMethod(method, func) {
        this.methods[method] = func;
    }

    start(port) {
        this.server.listen(port);
    }

    stop() {
        this.server.end();
    }
};

exports.AppRouter = class {
    constructor(apps) {
        this.apps = apps;
    }

    getApp(path) {
        return this.apps.find(app => app.path.exec(path));
    }
};

exports.App = class {
    constructor(path, func, allowedMethodRejectionMsg = '', ...allowedMethods) {
        this.path = path;
        this.func = func;
        this.allowed = allowedMethods.length > 0
            ? allowedMethods
            : ['GET', 'PUT', 'POST', 'DELETE'];
        this.rejectionMsg = allowedMethodRejectionMsg;
    }

    do(req, res) {
        if (this.allowed.indexOf(req.method) == -1) {
            //Method not allowed, insta rejection
            res.writeHead(405);
            res.end(this.rejectionMsg);
        }
        let parsed = urlParser(req.url);
        this.func(
            res,
            decodeURIComponent(parsed.pathname).slice(1) /*path*/,
            queryParser(parsed.query) /*query*/,
            req,
        );
    }
};
