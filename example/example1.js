var Supportpal = require('../lib/supportpal');

var support = new Supportpal({ 'hostname': process.env.HOST, 'port': 443, 'hash': process.env.HASH });

/*
support.settings.get(function (err, data) {
  console.log(err)
  console.log(data)
});
*/

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