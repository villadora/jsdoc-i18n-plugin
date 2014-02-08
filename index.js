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
    symbolFound: function(e) {
    },
    newDoclet: function(e) {
        var doc = e.doclet;
        // e.doclet will refer to the newly created doclet
        // you can read and modify properties of that doclet if you wish
        var desc = doc.description,
            key = getLocaleFile(path.join(e.doclet.meta.path, e.doclet.meta.filename));
        if (typeof desc  === 'string') {
            doc.description = transDesc(key, desc);
        }else {
            // undefined
        }

        // class desc
        if(typeof doc.classdesc === 'string') {
            doc.classdesc = transDesc(key, doc.classdesc);
        }

        // properties
        if(doc.properties && doc.properties.length) {
            for(var i = 0, len = doc.properties.length; i < len; ++i) {
                var prop = doc.properties[i];
                if(prop.description)
                    prop.description = transDesc(key, prop.description);
            }
        }

        // params
        if(doc.params && doc.params.length) {
            for(var i = 0, len = doc.params.length; i < len; ++i) {
                var param = doc.params[i];
                if(param.description)
                    param.description = transDesc(key, param.description);
            }
        }
        
        // returns
        if(doc.returns && doc.returns.length) {
            for(var i = 0, len = doc.returns.length; i < len; ++i) {
                var ret = doc.returns[i];
                if(ret.description)
                    ret.description = transDesc(key, ret.description);
            }
        }
        

    },
    fileBegin: function(e) {
        var key = getLocaleFile(e.filename), data;
        if(fs.existsSync(key)) {
            try {
                data = JSON.parse(fs.readFileSync(key, 'utf8'));
            }catch(e) {
                console.warn(e);
            }
        }
        
        localesData[key] = data || {};
    },
    fileComplete: function(e) {
        var key = getLocaleFile(e.filename),
            data = localesData[key], empty = true;

        for(var p in data) {
            empty = false;
            break;
        }
            

        if(!empty) {
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



function transDesc(key, desc) {
    var data = localesData[key];
    if(data.hasOwnProperty(desc)) {
        if(desc != data[desc])
            return data[desc];
    }else {
        data[desc] = desc;
    }

    return desc;
}
