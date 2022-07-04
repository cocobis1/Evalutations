const express = require("express")
const fetch = require("node-fetch")

let port = 8080
let app = express()

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})

// =============== API MODULE 1 ========================
// API LINK 1
app.get("/image0", function(req,res){
    fetch("https://fakerapi.it/api/v1/images?_quantity=5&_type=nature")
        .then(
            response => response.json()
        )
        .then(
            result => res.json(result)
            )
        })

//API LINK 2
app.get("/image1", function(req,res){
    fetch("https://fakerapi.it/api/v1/images?_quantity=5&_type=pokemon")
        .then(
            response => response.json()
        )
        .then(
            result => res.json(result)
            )
        })

//API LINK3
app.get("/image2", function(req,res){
    fetch("https://fakerapi.it/api/v1/images?_quantity=5&_type=animals")
        .then(
            response => response.json()
        )
        .then(
            result => res.json(result)
            )
        });

// =====================================================
// ====== MODULE 2 =======
app.get("/users", function(req,res){
    fetch("https://fakerapi.it/api/v1/users?_quantity=3")
        .then(
            response => response.json()
        )
        .then(
            result => res.json(result)
            )
        })
// CREDIT CARDS
app.get("/cards", function(req,res){
    fetch("https://fakerapi.it/api/v1/credit_cards?_quantity=3")
        .then(
            response => response.json()
        )
        .then(
            result => res.json(result)
        )
})

// ======= MODULE 3 =======
app.get("/company", function(req,res){
    fetch("https://fakerapi.it/api/v1/companies?_quantity=10")
        .then(
            response => response.json()
        )
        .then(
            result => res.json(result)
        )
})

app.use(express.static('public')) // dossier 'public' pour inclure les fichier JS et css
app.listen(port)
console.log("\n\nServer launched at : Localhost:" + port)
