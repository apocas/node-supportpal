# node-supportpal

Node.js client for [SupportPal](https://www.supportpal.com/) MicroVM platform.

## Installation

`npm install supportpal`

## Usage

 * Check [SupportPal API documentation](https://api.supportpal.com/) for more details.
 

### Getting started

To use `supportpal` first you need to instantiate it:

``` js
var support = new Supportpal({ 'hostname': process.env.HOST, 'port': 443, 'hash': process.env.HASH });
```

### Creating a ticket

``` js
var opts = {
  'subject': 'subject testtttt',
  'text': 'text testtttttt',
  'status': 1,
  'priority': 1,
  'department': 1,
  'user_email': 'petermdias@gmail.com',
  'user_firstname': 'Pedro',
  'user_lastname': 'Dias'
};
support.ticket.create(opts, function(err, data) {
  console.log(err)
  console.log(data)
});
```

## Tests

 * Tests are implemented using `mocha` and `chai`. Run them with `npm test`.

## Examples

Check the examples folder for more specific use cases examples.

## License

Pedro Dias - [@pedromdias](https://twitter.com/pedromdias)

Licensed under the Apache license, version 2.0 (the "license"); You may not use this file except in compliance with the license. You may obtain a copy of the license at:

    http://www.apache.org/licenses/LICENSE-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the license is distributed on an "as is" basis, without warranties or conditions of any kind, either express or implied. See the license for the specific language governing permissions and limitations under the license.