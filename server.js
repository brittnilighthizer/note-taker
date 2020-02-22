// Dependencies
// var http = require("http");
var fs = require("fs");
var express = require("express");
var path = require("path");
var app = express();
var PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../11-note-taker/public/notes.html"));
});

app.get(`/api/notes`, function (req, res) {
    fs.readFile(__dirname + "/db/db.json", "utf8",function (err, data) {
        if (err) throw err;
        return data
    }
    )
})

app.post(`/api/notes`, function (req, res) {
    console.log(res.body)
    fs.writeFile(__dirname + "/db/db.json", res.body, function (err) {
        if (err) throw err;
    })
})

function display404(url, res) {
    var myHTML = "<html>" +
        "<body><h1>404 Not Found </h1>" +
        "<p>The page you were looking for: " + url + " can not be found</p>" +
        "</body></html>";

    res.writeHead(404, { "Content-Type": "text/html" });

    res.end(myHTML);
}

app.listen(PORT, function () {
    console.log("Server is listening on PORT: " + PORT);
})