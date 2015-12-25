var co = require("co");
var locations = require("./locationRoutes.js");

var app = require("./app.js");
var request = require("supertest").agent(app.listen());

describe("Location Api:", function() {
    
    var test_location = { device: "LGX-ASDGR1-5532", lat: "10.23121",
                            lon: "13.08831", time: "2016-01-09T10:11:03"};

    it("Creates a new location", function(done) {
        
        request
            .post("/api/location")
            .send(test_location)
            .expect(200, done);
    });
});
