const bodyParser = require("body-parser")
const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const users = require("./users")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("home", { data: users })
})
app.post("/", (req, res) => {
    const [
        inputUserName,
        inputUserEmail,
        inputUserAge,
        inputUserUniqueId
    ] = [
            req.body.userName,
            req.body.userEmail,
            req.body.userAge,
            req.body.userUniqueId,
        ]
    users.push({
        userName: inputUserName,
        userEmail: inputUserEmail,
        userAge: inputUserAge,
        userUniqueId: inputUserUniqueId
    })
    res.render("home", { data: users })
})
app.post("/delete", (req, res) => {
    const requestedUserUniqueId = req.body.userUniqueId
    let j = 0
    users.forEach(user => {
        j += 1
        if (user.userUniqueId === requestedUserUniqueId) {
            users.splice((j - 1), 1)
        }
    })
    res.render("home", { data: users })
})
app.post("/update", (req, res) => {
    const inputUserName = req.body.userName
    const inputUserEmail = req.body.userEmail 
    const inputUserAge = req.body.userAge 
    const inputUserUniqueId = req.body.userUniqueId
    let j = 0
    users.forEach(user => {
        j += 1
        if (user.userUniqueId === inputUserUniqueId) {
            user.userName = inputUserName
            user.userEmail = inputUserEmail
            user.userAge = inputUserAge
        }
    })
    res.render("home", { data: users })
})

mongoose.connect(process.env.URI_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to database"))
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("server is up")
        })
    })
    .catch(err => console.log(err))