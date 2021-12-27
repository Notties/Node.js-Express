const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const products = require("./data/products.json");
const productsRouter = express.Router();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, "/public/")));

app.set("views", "./src/views");
app.set("view engine", "ejs");

productsRouter.route("/").get((req, res) => {
    res.render("products", 
        products,
    );
});

productsRouter.route("/1").get((req, res) => {
    res.send("products");
});

app.use("/products", productsRouter);

app.get("/", (req, res) => {

    res.render('index', { username: 'Username', customers: ["User1", "User2", "User3"] });

});

app.listen(PORT, () => {
    debug("Listening on port : " + PORT);
});