var Stub = require('./stub');
var Modem = require('./modem');

var Supportpal = function(options) {
  this.options = options

  this.modem = new Modem(this.options);

  //core
  this.brand = new Stub('/core/brand', this.modem);
  this.language = new Stub('/core/language', this.modem);
  this.settings = new Stub('/core/settings', this.modem);

  this.ipban = new Stub('/core/ipban', this.modem);
  this.ipwhitelist = new Stub('/core/ipwhitelist', this.modem);
  this.spamrule = new Stub('/core/spamrule', this.modem);

  //user
  this.user = new Stub('/user/user', this.modem);
  this.operator = new Stub('/user/operator', this.modem);
  this.organisation = new Stub('/user/organisation', this.modem);
  this.usergroup = new Stub('/user/usergroup', this.modem);
  this.operatorgroup = new Stub('/user/operatorgroup', this.modem);
  this.customfield = new Stub('/user/customfield', this.modem);
  this.organisationcustomfield = new Stub('/user/organisationcustomfield', this.modem);
  this.role = new Stub('/user/role', this.modem);
  this.permission = new Stub('/user/permission', this.modem);

  //ticket
  this.ticket = new Stub('/ticket/ticket', this.modem);
  this.message = new Stub('/ticket/message', this.modem);

  this.attachment = new Stub('/ticket/attachment', this.modem);
  this.attachment.download = function(id, callback) {
    var self = this;
  
    var optionsf = {
      path: '/ticket/attachment/' + id + '/download',
      method: 'GET',
      statusCodes: {
        200: true
      }
    };

    if (callback === undefined) {
      return new Promise(function (resolve, reject) {
        self.modem.dial(optionsf, function (err, data) {
          if (err) {
            return reject(err);
          }
          resolve(data);
        });
      });
    } else {
      self.modem.dial(optionsf, function (err, data) {
        callback(err, data);
      });
    }
  };

  this.status = new Stub('/ticket/status', this.modem);
  this.priority = new Stub('/ticket/priority', this.modem);
  this.tag = new Stub('/ticket/tag', this.modem);
  this.customfield = new Stub('/ticket/customfield', this.modem);
  this.cannedresponse = new Stub('/ticket/cannedresponse', this.modem);
  this.department = new Stub('/ticket/department', this.modem);
  this.filter = new Stub('/ticket/filter', this.modem);

  this.forward = new Stub('/ticket/forward', this.modem);

}

module.exports = Supportpal;