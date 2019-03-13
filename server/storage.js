let fs = require('mz/fs');
let {basename, join: joinPath} = require('path');
let mkdirp_callback = require('mkdirp'); //mkdir -p or create nice nice dirs recursively

function padZeroes(integer, nZeroes) {
    let str = integer.toString();
    str = '0'.repeat(nZeroes - str.length) + str;
    return str;
}

//Own promise version of mkdirp
function mkdirp(path) {
    return new Promise((resolve, reject) => {
        mkdirp_callback(path, err => {
            if (err) reject(err);
            resolve();
        });
    });
}

function getDirectoryTree(path, excluded = /[]/) {
    if (!fs.statSync(path).isDirectory()) return null;
    let tree = {
        type: 'directory',
        path: path,
        name: basename(path),
        children: [],
    };
    fs.readdirSync(path)
        .filter(sub => !excluded.test(sub))
        .forEach(subDir => {
            let completePath = path + '/' + subDir;
            if (fs.statSync(completePath).isDirectory()) {
                tree.children.push(getDirectoryTree(completePath, excluded));
            } else {
                tree.children.push({
                    type: 'file',
                    path: completePath,
                    name: subDir,
                });
            }
        });

    return tree;
}

function storeMeteomoment(date, data) {
    let path = joinPath(
        //Path will be year/month/day.txt, this way it is easier to find things
        'data',
        date.getFullYear().toString(),
        (date.getMonth() + 1).toString(), //Month is for some reason returned in range [1, 11]
    );
    mkdirp(path).then(() => {
        //Create dir, it throws no error if it already exists so wathever
        //Now that it surely exists, append to file
        let stream = fs.createWriteStream(
            joinPath(path, date.getDate().toString() + '.txt'),
            {flags: 'a'},
        );

        stream.write(
            '[' +
                padZeroes(date.getHours(), 2) +
                ':' +
                padZeroes(date.getMinutes(), 2) +
                ':' +
                padZeroes(date.getSeconds(), 2) +
                ':' +
                padZeroes(date.getMilliseconds(), 4) +
                ']\n',
        ); //Write time
        for (prop in data) //Write all properties present in data, followed by newline
            stream.write(prop + ':' + data[prop] + '\n');
        stream.end();
        //Note: since we have not \r, newlines will not be shown in windows.
        //However, our server isnt that picky so I personally dont care this time.
    });
}

function retrieveMeteomoment(t) {}
function retrieveRange(t0, tf, dt, n) {}

exports.storeMeteomoment = storeMeteomoment;
exports.retrieveMeteomoment = retrieveMeteomoment;
exports.retrieveRange = retrieveRange;
