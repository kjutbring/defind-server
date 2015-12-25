var koa = require("koa");
var app = module.exports = koa();
var routes = require("koa-route");

// location routes
var locationRoutes = require("./locationRoutes.js");
app.use(routes.post("/api/location", locationRoutes.add));
app.use(routes.get("/api/location/:device", locationRoutes.get));
app.use(routes.put("/api/location/:device", locationRoutes.update));
app.use(routes.del("/api/location/:device", locationRoutes.remove));


app.listen(3000);
console.log("Listening on port 3000.");
