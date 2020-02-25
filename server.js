// Dependencies
// var http = require("http");
var fs = require("fs");
var express = require("express");
var path = require("path");
var arr = require("./db/db.json");
var app = express();
var PORT = 8080;
var util = require("util");

const readFileAsync = util.promisify(fs.readFile);


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/notes", (req, res) => readFileAsync("./db/db.json", function (err, data) {
    if (err) {
        console.log(err)
    }
})
.then(function(results) {
    res.json(JSON.parse(results))
})
)



app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post(`/api/notes/`, function (req, res) {
    arr.push(req.body);
    console.log(arr)
    fs.writeFile("./db/db.json", JSON.stringify(arr), function (err) {
        if (err) throw err;
    })
    res.json(arr)
})

app.delete(`/api/notes/:id`, function (req, res) {
    console.log(req.params.id)
})

function display404(url, res) {
    var myHTML = "<html>" +
        "<body><h1>404 Not Found </h1>" +
        "<p>The page you were looking for: " + url + " can not be found</p>" +
        "</body></html>";

    res.writeHead(404, { "Content-Type": "text/html" });

    res.end(myHTML);
}

app.listen(PORT, () => (console.log("Server is listening on PORT: " + PORT)));
