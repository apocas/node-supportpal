var http = require('http'),
  https = require('https'),
  debug = require('debug')('modem'),
  util = require('util'),
  querystring = require('querystring');


var Modem = function (options) {
  this.timeout = options.timeout;
  this.connectionTimeout = options.connectionTimeout;
  this.headers = options.headers || {};

  this.hostname = options.hostname;
  this.port = options.port;
  this.hash = options.hash;
};

Modem.prototype.dial = function (options, callback) {
  var self = this;

  var optionsf = {
    hostname: self.hostname,
    port: self.port,
    path: '/api' + options.path,
    method: options.method,
    headers: options.headers || Object.assign({}, self.headers),
  };

  if (this.port = 443) {
    this.client = https;
  } else {
    this.client = http;
  }

  optionsf.headers['Authorization'] = 'Basic ' + Buffer.from(this.hash + ':x').toString('base64');

  optionsf.headers['Content-Type'] = 'application/json';

  this.buildRequest(optionsf, options, callback);
};

Modem.prototype.buildRequest = function (options, context, callback) {
  var self = this;
  var connectionTimeoutTimer;
  var data;

  if (context.data) {
    if (options.method === 'GET') {
      if (Object.keys(context.data).length > 0) {
        options.path += '?' + this.buildQuerystring(context.data);
      }
    } else {
      data = JSON.stringify(context.data);
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }
  }

  //console.log(options);
  var req = this.client.request(options, function () { });

  debug('Sending: %s', util.inspect(options, {
    showHidden: true,
    depth: null
  }));

  if (self.connectionTimeout) {
    connectionTimeoutTimer = setTimeout(function () {
      debug('Connection Timeout of %s ms exceeded', self.connectionTimeout);
      req.abort();
    }, self.connectionTimeout);
  }

  if (self.timeout) {
    req.on('socket', function (socket) {
      socket.setTimeout(self.timeout);
      socket.on('timeout', function () {
        debug('Timeout of %s ms exceeded', self.timeout);
        req.abort();
      });
    });
  }

  req.on('connect', function () {
    clearTimeout(connectionTimeoutTimer);
  });

  req.on('disconnect', function () {
    clearTimeout(connectionTimeoutTimer);
  });

  req.on('response', function (res) {
    clearTimeout(connectionTimeoutTimer);

    var chunks = [];
    res.on('data', function (chunk) {
      chunks.push(chunk);
    });

    res.on('end', function () {
      var buffer = Buffer.concat(chunks);
      var result = buffer.toString();

      debug('Received: %s', result);

      var json;
      try {
        json = JSON.parse(result);
      } catch (e) {
        json = null;
      }
      //console.log(res.headers)
      self.buildPayload(null, context.statusCodes, res, json, callback);
    });
  });

  req.on('error', function (error) {
    clearTimeout(connectionTimeoutTimer);
    self.buildPayload(error, context.statusCodes, {}, null, callback);
  });

  if (context.data && options.method !== 'GET') {
    console.log(data);
    req.write(data);
  }
  req.end();
};

Modem.prototype.buildPayload = function (err, statusCodes, res, json, cb) {
  if (err) return cb(err, null);

  if (statusCodes[res.statusCode] !== true) {
    var msg = new Error(
      '(HTTP code ' + res.statusCode + ') ' +
      (statusCodes[res.statusCode] || 'unexpected') + ' - ' +
      json + ' '
    );
    msg.reason = statusCodes[res.statusCode];
    msg.statusCode = res.statusCode;
    msg.json = json;
    cb(msg, null);
  } else {
    cb(null, json);
  }
};

Modem.prototype.buildQuerystring = function (opts) {
  var clone = {};

  // serialize map values as JSON strings, else querystring truncates.
  Object.keys(opts).map(function (key, i) {
    clone[key] = opts[key] && typeof opts[key] === 'object' && key !== 't' ?
      JSON.stringify(opts[key]) : opts[key];
  });

  return querystring.stringify(clone);
};


module.exports = Modem;