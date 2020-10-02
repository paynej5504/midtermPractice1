const express = require("express");
const fs = require("fs");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geoCode = require("./utils/geocode");
const { runInNewContext } = require("vm");

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express confi
const publickDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebarsengine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup statick directory to serve
app.use(express.static(publickDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather Conditions",
        name: "Suad Muhic"
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Suad Muhic"
    });
})

app.get("/help", (req, res) => {
    res.render("help", {
        msg: "This is a help page",
        title: "Help",
        name: "Suad Muhic"
    });
})

app.get("/weather", (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error:"You must provide location"
        });
    };

    geoCode(req.query.adress, (error, {latitude, longitude , location} = {}) => {
        if (error) {
            return res.send({ error }); 
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error }); 
            }
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.adress
            })
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        msg:"Help article not found"
    });  
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        msg:"Page not found"
    });  
});

app.listen(port, () => {
    console.log("Server is up on port " +  port);
})