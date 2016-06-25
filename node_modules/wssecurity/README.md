# WS-Security for Node.js

*Forked from [https://github.com/alexsantos/ws-security](https://github.com/alexsantos/ws-security). Their version was missing a critical file which caused errors when installing from NPM. This fork fixes that issue. We will do our best to maintain and keep this up to date but this library is not our highest priority right now.*

> Implementing WS-Security on SOAP clients

This module is based on the work from the vpulim/node-soap module. This implementation now makes it available to other SOAP Clients using nodejs.
This module is a rewrite to make the attributes passed private (username and password).

## Install

```sh
$ npm install wssecurity
```


## Usage

```js
var WSSecurity = require('ws-security');

var sec = new WSSecurity('username', 'password');

var xml = sec.toXML();
```


## License

MIT © [Alexandre Santos](https://github.com/alexsantos)


[npm-url]: https://npmjs.org/package/ws-security
[npm-image]: https://badge.fury.io/js/ws-security.svg
[travis-url]: https://travis-ci.org/alexsantos/ws-security
[travis-image]: https://travis-ci.org/alexsantos/ws-security.svg?branch=master
[daviddm-url]: https://david-dm.org/alexsantos/ws-security.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/alexsantos/ws-security
