const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");

//Set storage engine
const storage = multer.diskStorage({
    destination: "./public/uploads/", // choose the destination of the file
    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) // choose the name of the file
    }

})

//Init Upload
const upload = multer({
    storage: storage,
    limits: {fileSize:200000000}, // limit the size of the file can be uploaded, in this case, it is 10 bytes, this can also trigger error
    fileFilter: function(req,file,cb){
        checkFileType(file, cb);
    }
}).single("myImage") //the Name is passed

//Check file Type
function checkFileType(file, cb){
    //Allowed extentions
    const filetypes = /jpeg| jpg|png|gif/;
    //Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())// check by the path extension name
    //Check mime
    const mimetype = filetypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null, true)
    } else {
        cb("Error: Images Only")
    }
}


//Init app
const app = express();


//EJS
app.set("view engine", "ejs")

//Public folder
app.use(express.static("./public"))

app.get("/", (req,res) => res.render("index"))

app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render("index", {msg: err}); // rerender with message error
           } else {
                console.log(req.file); // get the file information, we can store this in mongodb
                
                if(req.file == undefined){
                    res.render("index", {
                        msg: "Error: No file uploaded!",
                    })
                } else {
                    res.render("index", {
                        msg: "File uploaded",
                        file: `uploads/${req.file.filename}`
                    })
                    
                }
            }
        });
});

app.listen(3000, function() {
    console.log("The server is started in port 3000")
});