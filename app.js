var koa = require("koa");
var app = module.exports = koa();
var routes = require("koa-route");

// location routes
var locationRoutes = require("./locationRoutes.js");
app.use(routes.post("/location", locationRoutes.add));
app.use(routes.get("/location/:device", locationRoutes.get));
app.use(routes.put("/location/:device", locationRoutes.update));
app.use(routes.del("/location/:device", locationRoutes.remove));


app.listen(3000);
console.log("Listening on port 3000.");
