#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> A minimalist SOAP client for io.js.

## Introduction
This module implements a SOAP client in the most simple way possible. There is no need
to invoke the WSDL to discover attributes and operations - it simply uses *request* to invoke
the webservice. This module was inspired by the module
[AirAsiaExpedia/node-foam](https://github.com/AirAsiaExpedia/node-foam) but implementing ES6 features like
Promises and WS-Security.

## Install

```sh
$ npm install --save soap-cli-simple
```

## Usage

```js
var soap = require('soap-cli-simple');

soap(endpoint, operation, action, message, options).then(onsuccess).catch(onerror);

```
### Parameters
* endpoint - the url of the SOAP webservice
* operation - the SOAP operation
* action - the SOAPAction HTTP Header
* message - a JS object representing the message to be serialized to XML
* options - a JS object listing the options that can be passed to the client

### Options
* namespace - the default namespace indicated on the WSDL
* namespaces - an array of other namespaces indicated on the WSDL (including the xmlns, as it will
appear on the XML)
* header - optional SOAP Headers

### WS-Security
To implement WS-Security, it's necessary to pass the information to the SOAP Header, using
the [ws-security](https://www.npmjs.com/package/ws-security) module:
```js
var soap = require('soap-cli-simple'),
    WSSecurity = require('ws-security');
    
var security = new WSSecurity('username', 'password', 'PasswordText');

var options = {
        header: security.toXML()
    };
```
### SoapUI or other tools
It is a good practice to use a tool like SoapUI to help on the configuration of the client and
on the message templating.

Message on SoapUI:
```
<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.oracle-base.com/webservices/">
   <soapenv:Header/>
   <soapenv:Body>
      <web:ws_add soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <int1 xsi:type="xsd:string">1</int1>
         <int2 xsi:type="xsd:string">2</int2>
      </web:ws_add>
   </soapenv:Body>
</soapenv:Envelope>
```
Javascript Object:
```
{
    "ws_add": {
        "int1": "1",
        "int2": "2"
    }
}
```

### Examples
On the ```test``` folder there is an example of a SOAP invocation.
## License

MIT © [Alexandre Santos](https://github.com/alexsantos)


[npm-url]: https://npmjs.org/package/soap-cli-simple
[npm-image]: https://badge.fury.io/js/soap-cli-simple.svg
[travis-url]: https://travis-ci.org/alexsantos/soap-cli-simple
[travis-image]: https://travis-ci.org/alexsantos/soap-cli-simple.svg?branch=master
[daviddm-url]: https://david-dm.org/alexsantos/soap-cli-simple.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/alexsantos/soap-cli-simple
