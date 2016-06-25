/*global describe, it */
'use strict';
var assert = require('assert');
var WSSecurity = require('../');

// We need a lot more tests here
describe('ws-security node module', function () {
    it('must set the password as private attribute', function () {
        var sec = new WSSecurity('username', 'password');
        assert.throws(function () {
            var username = sec.username;
            if (!username) {
                throw new Error("Wrong value");
            }
        }, Error);
    });
});