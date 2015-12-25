var parse = require("co-body");

var nano = require("nano")("http://localhost:5984");
var wrap = require("co-nano");
var coNano = require("co-nano")(nano);

var db = coNano.use("location_api");

module.exports.add = function * () {
    var postedLocation = yield parse(this);
    
    var res = yield db.insert(postedLocation);
    var body = res[0], headers = res[1];

    this.set("locaton", "/location/" + res._id);
    this.status = 200;
};

module.exports.get = function *get(device) {
    this.body = "you passed: " + device;
};
