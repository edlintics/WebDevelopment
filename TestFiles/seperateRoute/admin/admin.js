const express = require("express");


function adminpath(app) {
    app.get("/admin", function(req,res){
        res.write("I am a new route")
        res.end()
    })

}

module.exports = adminpath