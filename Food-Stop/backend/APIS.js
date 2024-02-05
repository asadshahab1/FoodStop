"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 3000;
app.get('/register-customer', function (req, res) {
    var _a = req.body, fName = _a.fName, lName = _a.lName, email = _a.email, password = _a.password, phone = _a.phone, address = _a.address;
    return res.send("OK");
});
app.listen(port, function () {
    console.log("Server is listening at ".concat(port));
});
