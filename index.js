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

// normalize extension
(extension[0] !== ".") && (extension = '.' + extension);



exports.handlers = {
    newDoclet: function(e) {
        // e.doclet will refer to the newly created doclet
        // you can read and modify properties of that doclet if you wish

        if (typeof e.doclet.description === 'string') {
            console.log(e.doclet.description);

            var filename = e.doclet.meta.filename,
                mc = /(.*)(\.(:?[^.]+)?)$/.exec(filename);
            
            if(mc) filename = mc[1];
            
            var localeFile = path.join(directory, path.relative(srcDir, e.doclet.meta.path), 
                                       filename + extension);
            console.log(localeFile);
        }
    }
};
