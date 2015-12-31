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

module.exports.remove = function *del(id) {
    
    var documentId = { id };

    console.log("del request sent for id: " + id);

    this.status = 200; 
};

module.exports.update = function *put() {
    
    var locationJson = yield parse(this);

    console.log("put request sent with device: " + locationJson);
}





