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
  
    var deviceJson = { device: [device] };
    
    nano.view("locations", "by_device_id", deviceJson, function(err, body) {
        
        if (!err) {
            body.rows.forEach(function(doc) {
                console.log(doc);
            });
        }
    });

    this.status = 200;
};




