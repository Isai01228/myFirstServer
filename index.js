require("dotenv").config()

const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const passport = require(`./config/passport`)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())
app.use(passport.session())

const user = require(`./routes/userRoutes`)
app.use(`/`, user)

const car = require(`./routes/carRoutes`)
app.use(`/`, car)

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err, res) => {
    if (err) throw new Error('ME ROMPISTE MAN </3');

    console.log('estoy conectadoo a la base de gatos')
})

app.listen(3000, () => {
    console.log(`todo bien `)
})