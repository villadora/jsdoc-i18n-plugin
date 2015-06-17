# JsDoc i18n Plugin

JsDoc i18n plugin is to provide i18n translates for jsdocs.


## Installation

Install with npm:

    npm install jsdoc-i18n-plugin --save
    
    
## Usage

Add following config into your jsdoc.config.json:

```javascript
{
    ...
    "plugins": [
       "path/to/i18n/plugins/folder/in/node_modules/"
    ],
    "i18n": {
       "locale": "<en_US|zh_CN|...>", 
       "directory": "/path/to/put/your/translation/files/default/is/locales/in/working/directory",
       "srcDir": "/base/src/directory/to/build/tree/structure/for/source/files/default/is/current/directory",
       "extension": ".js" // or using .json instead.
    }
    ...
}
```

Then you can run jsdoc command, this plugin will automatically generate json files for specific locale. You can do translation work based on that file. The file will look like following: 


```javascript
{
    "Hello": "Hello",
    "weekend": "weekend",
    "tree": "tree"
}
```
