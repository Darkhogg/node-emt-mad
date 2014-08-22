EMT Madrid for Node.js
======================

`emt-mad` is an API client for easy access to the [EMT Madrid open data][emtod] services.

  [emtod]: http://opendata.emtmadrid.es/


Example
-------

```javascript
var EmtMad = require('emt-mad');

emt = new EmtMad('idClient', 'passKey');
emt.busGetListLines().then(console.dir);
```


Implementation
--------------

This module exports a single class, `EmtMad`, that can be instantiated with a
client ID and a pass key. This new instance can then be used to perform requests
to the API.

All methods that perform requests return [Bluebird] promises.

  [Bluebird]: https://github.com/petkaantonov/bluebird

### new EmtMad(idClient, passKey)

Creates a new object that can perform requests to the EMT OpenData API using the
given `idClient` and `passKey` as provided by EMT.


### EmtMad#request(service, parameters)

Performs a request to the specified `service` sending the given `parameters`.
This is the base method upon every other builds. It allows to perform low-level
requests to the API, without any transformation of input or output, other than a
bit of error handling. The returned promise will get the `resultValue` object
as-is, with any errors thrown as exceptions.


### Other Methods

> TODO: Add all other methods here
