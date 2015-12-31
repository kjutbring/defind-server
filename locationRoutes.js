var parse = require("co-body");

var nano = require("nano")("http://localhost:5984/location_api");

module.exports.add = function * () { 

    var postedLocation = yield parse(this);
    
    console.log(postedLocation);
     
    nano.insert(postedLocation, function(err, body) {
       
        if (!err) {
            console.log(body);
        }
    });

    this.status = 200; 
};

module.exports.get = function *get(device) {
  
    var deviceJson = { keys: [device] };
    
    var body = nano.view("locations", "by_device_id", deviceJson, function(err, body) {
        
        if (!err) {
            body.rows.forEach(function(doc) {
                console.log(doc);
            });
        }
    });
    
    this.body = body;

    this.status = 200;
};




