/*****************************************************************************/
/* Copyright (C) 2013 Vinay Pulim                                            */
/* Copyright (C) 2015 Alexandre Santos                                       */
/*                                                                           */
/* Permission is hereby granted, free of charge, to any person obtaining a   */
/* copy of that software and associated documentation files (the "Software"),*/
/* to deal in the Software without restriction, including without limitation */
/* the rights to use, copy, modify, merge, publish, distribute, sublicense,  */
/* and/or sell copies of the Software, and to permit persons to whom the     */
/* Software is furnished to do so, subject to the following conditions:      */
/*                                                                           */
/* The above copyright notice and that permission notice shall be included   */
/* in all copies or substantial portions of the Software.                    */
/*                                                                           */
/* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS   */
/* OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF                */
/* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN */
/* NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,  */
/* DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR     */
/* OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE */
/* USE OR OTHER DEALINGS IN THE SOFTWARE.                                    */
/*****************************************************************************/

"use strict";

var crypto = require('crypto'),
    passwordDigest = require('./lib/utils').passwordDigest;

function WSSecurity(username, password, passwordType) {
    var that = {
        _username: username,
        _password: password,
        _passwordType: passwordType || 'PasswordText'
    };
    return {
        toXML: function () {
            // avoid dependency on date formatting libraries
            function getDate(d) {
                function pad(n) {
                    return n < 10 ? '0' + n : n;
                }
                return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + 'Z';
            }
            var now = new Date();
            var created = getDate(now);
            var expires = getDate(new Date(now.getTime() + (1000 * 600)));

            var password;
            if (that._passwordType === 'PasswordText') {
                password = "<wsse:Password>" + that._password + "</wsse:Password>";
            } else {
                // nonce = base64 ( sha1 ( created + random ) )
                var nHash = crypto.createHash('sha1');
                nHash.update(created + Math.random());
                var nonce = nHash.digest('base64');
                password = "<wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest\">" + passwordDigest(nonce, created, that._password) + "</wsse:Password>" +
                    "<wsse:Nonce EncodingType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary\">" + nonce + "</wsse:Nonce>";
            }

            return "<wsse:Security xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">" +
                "<wsu:Timestamp wsu:Id=\"Timestamp-" + created + "\">" +
                "<wsu:Created>" + created + "</wsu:Created>" +
                "<wsu:Expires>" + expires + "</wsu:Expires>" +
                "</wsu:Timestamp>" +
                "<wsse:UsernameToken xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\" wsu:Id=\"SecurityToken-" + created + "\">" +
                "<wsse:Username>" + that._username + "</wsse:Username>" +
                password +
                "<wsu:Created>" + created + "</wsu:Created>" +
                "</wsse:UsernameToken>" +
                "</wsse:Security>";
        }
    };
}
module.exports = WSSecurity;