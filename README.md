EMT Madrid for Node.js
======================

![](http://img.shields.io/npm/v/emt-mad.svg?style=flat)
&nbsp;
<!--![](http://img.shields.io/travis/darkhogg/emt-mad.svg?style=flat)-->

`emt-mad` is an API client for easy access to the [EMT Madrid open data][emtod]
services.

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

#### `new EmtMad(idClient, passKey)`

Creates a new object that can perform requests to the EMT OpenData API using the
given `idClient` and `passKey` as provided by EMT.


#### `EmtMad#request(service, parameters)`

Performs a request to the specified `service` sending the given `parameters`.
This is the base method upon every other builds. It allows to perform low-level
requests to the API, without any transformation of input or output, other than a
bit of error handling. The returned promise will get the `resultValue` object
as-is, with any errors thrown as exceptions.


### Bus Services

#### `EmtMad#busGetCalendar(dateBegin, dateEnd)`

Gets a list of calendar items with some miscellaneous information about the
day. `dateBegin` marks the start of this list and defaults to `new Date()`.
`dateEnd` marks the end of the list and defaults to `dateBegin`.

See the [CalendarItem](#calendaritem) type for more information.


#### `EmtMad#busGetGroups(cultureInfo)`

Gets a list of "bus groups" with an identifier and a short description.
The `cultureInfo` parameter is supposed to select the language and defaults to
`EmtMad.CULTURE_EN`. It currently does not seem to work at all. Possible values
are:

  - `EmtMad.CULTURE_EN`: `"EN"`, English. Default value.
  - `EmtMad.CULTURE_ES`: `"ES"`, Spanish.

See the [GroupItem](#groupitem) type for more information.


#### `EmtMad#busGetLinesList(lines, date)`

Gets a list with all lines included on the `lines` parameters. If no lines are
given, this method returns all available lines. The `date` parameter indicates
the date for which line information is returned, and defaults to the current
day.

See the [LineItem](#lineitem) type for more information.


### Other Methods

> TODO: Add all other methods


### Data Types and Values

#### `CalendarItem`

  - `date`: A [`Moment`][momentjs] object constructed from the response.
  - `dayType`: A string value that determines the type of day from the
    perspective of EMT bus operation. The following constans are available for
    easy usage:

    + `EmtMad.DAYTYPE_WORK`: Working day
    + `EmtMad.DAYTYPE_HOLIDAY_EVE`: The day before a holiday
    + `EmtMad.DAYTYPE_HOLIDAY`: Holiday

  - `strike`: *(Speculative)* Whether or not there is a strike programmed for
    the day, as a boolean. The value of this field is converted from the
    observed value of `"N"` meaning `false`, and anything else meaning `true`.
  - `weather`: Unchanged value from the API representing the expected weather.
    *Note: The existence of this field is documented, but its values aren't, and
    I personally have not seen it anywhere. Expect it to be `undefined` most
    times.*
  - `minTemp`, `maxTemp`: Minimum and maximum temperature expected for the day.
    *Note: In every request I did, these values were returned as `0`.*
  - `seasonTg`, `seasonTU`, `dayTypeLT`, `dayTypePF`, `dayTypeCO`: Unchanged
    information that I really don't know how to interpret.
    **Help would be appreciated**. These fields are subject to change in the
    future as I decypher what they mean.
  - `week`, `month`, `trimester`, `quarter`, `semester`, `year`, `dayOfWeek`:
    Unchanged information returned from the API. These values technically serve
    little purpose, as they can be calculated from the `date` with little
    effort. The existence of these fields is subject to change in the future.

  [momentjs]: http://momentjs.com/


#### `GroupItem`

  - `id`: An integer representing identifier of the group. The observed values
    include only multiples of `100`.
  - `description`: A string with a textual description of the group.


#### `LineItem`

  - `id`: An integer representing the identifier of the line.
  - `label`: The actual line name shown in every informational piece of
    information of the city. Usually a number, lettler, or a letter and a
    number.
  - `group`: An integer representing the group to which the line belongs. This
    group does not necessary matches a group from the `GetGroups` service.
  - `nameA`: The name of one of the line ends, named `A`.
  - `nameB`: The name of the other line end, named `B`.
  - `dateFirst`: The date at which this information became valid.
  - `dateLast`: Known date at which this information becomes invalid.
