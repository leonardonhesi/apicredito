module.exports = (function () {
    var xml2js = require('xml2js');
    return {
        buildObject: function (message) {
            var builder = new xml2js.Builder({
                "headless": true,
                "renderOpts": {
                    "pretty": false
                }
            });
            return builder.buildObject(message);
        },
        parseString: function (str) {
            var prefixMatch = new RegExp(/(?!xmlns)^.*:/),
                stripPrefix = function (str) {
                    return str.replace(prefixMatch, '');
                },
                parser = new xml2js.Parser({
                    ignoreAttrs: true,
                    explicitArray: false,
                    firstCharLowerCase: true,
                    tagNameProcessors: [stripPrefix]
                });
            return new Promise(
                function (resolve, reject) {
                    parser.parseString(str, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
        }
    };
})();