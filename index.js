var path = require('path'), 
    fs = require('fs'),
    join = path.join,
    conf = env.conf.i18n || {},
    cwd = process.cwd();

var directory = conf.directory || "./locales",
    srcDir = path.resolve(cwd, conf.srcDir) || cwd;
    extension = conf.extension || ".js";


// make absolute path for directory
directory = path.resolve(cwd, directory);

directory = path.join(directory, conf.locale || 'en_US');

if(!fs.existsSync(directory))
    fs.mkPath(directory);


// normalize extension
(extension[0] !== ".") && (extension = '.' + extension);

var localesData = {};

exports.handlers = {
    newDoclet: function(e) {
        // e.doclet will refer to the newly created doclet
        // you can read and modify properties of that doclet if you wish
        var desc = e.doclet.description;
        if (typeof desc  === 'string') {
            var key = getLocaleFile(path.join(e.doclet.meta.path, e.doclet.meta.filename)),
                data = localesData[key];
            
            if(data.hasOwnProperty(desc)) {
                if(desc != data[desc])
                    e.doclet.description = desc;
            }else {
                data[desc] = desc;
            }
        }else {
            // undefined
        }
    },
    fileBegin: function(e) {
        var key = getLocaleFile(e.filename), data;
        if(fs.existsSync(key)) {
            try {
                data = JSON.parse(fs.readFileSync(key));
            }catch(e) {
                console.warn(e);
            }
        }
        
        localesData[key] = data || {};
    },
    fileComplete: function(e) {
        var key = getLocaleFile(e.filename),
            data = localesData[key];
        if(data) {
            var dir  = path.dirname(key);
            if(!fs.existsSync(dir)) {
                fs.mkPath(dir);
            }

            fs.writeFileSync(key, JSON.stringify(data, null, 4), 'utf8');
        }
    }
};


function getLocaleFile(filename) {
    mc = /(.*)(\.(:?[^.]+)?)$/.exec(filename);
    
    if(mc) filename = mc[1];
    
    var localeFile = path.join(directory, path.relative(srcDir, path.dirname(filename)), 
                               path.basename(filename) + extension);
    return localeFile;
}




