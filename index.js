var conf = env.conf.i18n || {};
console.log(env.conf);

exports.handlers = {
    newDoclet: function(e) {
        // e.doclet will refer to the newly created doclet
        // you can read and modify properties of that doclet if you wish

        if (typeof e.doclet.description === 'string') {
            console.log(e.doclet.description);
        }
    }
};
