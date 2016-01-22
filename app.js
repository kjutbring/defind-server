var koa = require("koa");
var app = module.exports = koa()
var routes = require("koa-route");
var jwt = require("koa-jwt");
var helmet = require("koa-helmet");
var ssl = require("koa-ssl");

app.use(ssl());
app.use(helmet());


/*
 * custom 401 message
 */
app.use(function *(next){
    try {
        yield next;
    } catch (err) {
        if (401 == err.status) {
            this.status = 401;
            this.body = "Protected resource, go away";
        } else {
            throw err;
        }
    }
});

/*
 * middleware below is only available with valid jwt token
 */
app.use(jwt({
    secret: "kittys_super_cool_secret",
    algorithm: "HS256"
}));

// location routes
var locationRoutes = require("./locationRoutes.js");
app.use(routes.post("/api/location", locationRoutes.add));
app.use(routes.get("/api/location/:device", locationRoutes.get));
app.use(routes.put("/api/location/:device", locationRoutes.update));
app.use(routes.del("/api/location/:device", locationRoutes.remove));

app.listen(3000);
console.log("Listening on port 3000.");
