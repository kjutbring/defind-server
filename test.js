var co = require("co");
var locations = require("./locationRoutes.js");

var app = require("./app.js");
var request = require("supertest").agent(app.listen);

describe("Location Api:", function() {
    
    var test_location = { device: "LGX-ASDGR1-5532", lat: "10.23121",
                            lon: "13.08831", time: "2016-01-09T10:11:03"};

    it("Creates a new location", function(done) {
        
        request
            .post("/location")
            .send(test_location)
            .expect("location", /^\/location\/[0-9a-fA-F]{24}$/)
            .expect(200, done);
    })
})
