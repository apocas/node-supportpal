var Stub = function(module, modem) {
  this.module = module;
  this.modem = modem;
}

Stub.prototype.get = function(id, options, callback) {
  var self = this;

  if (!callback && typeof options === 'function') {
    callback = options;
    options = undefined;
  } else if(!callback && !options) {
    callback = id;
    id = undefined;
    options = undefined;
  }

  var optionsf = {
    path: this.module,
    method: 'GET',
    data: options,
    statusCodes: {
      200: true
    }
  };

  if(id !== undefined) {
    optionsf.path += '/' + id;
  }

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
    this.modem.dial(optionsf, function (err, data) {
      callback(err, data);
    });
  }
};

Stub.prototype.create = function(options, callback) {
  var self = this;

  if (!callback && typeof options === 'function') {
    callback = options;
    options = undefined;
  }

  var optionsf = {
    path: this.module,
    method: 'POST',
    data: options,
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
    this.modem.dial(optionsf, function (err, data) {
      callback(err, data);
    });
  }
};

Stub.prototype.modify = function(id, options, callback) {
  var self = this;

  if (!callback && typeof options === 'function') {
    callback = options;
    options = undefined;
  }

  var optionsf = {
    path: this.module + '/' + id,
    method: 'PUT',
    data: options,
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
    this.modem.dial(optionsf, function (err, data) {
      callback(err, data);
    });
  }
};

Stub.prototype.delete = function(id, callback) {
  var self = this;

  if (!callback && typeof options === 'function') {
    callback = options;
    options = undefined;
  }

  var optionsf = {
    path: this.module + '/' + id,
    method: 'DELETE',
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
    this.modem.dial(optionsf, function (err, data) {
      callback(err, data);
    });
  }
};

module.exports = Stub;