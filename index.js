const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'moviesystem',
})

app.post('/create', (req, res) => {
    const movie = req.body.movie;
    const price = req.body.price;
    const show_date = req.body.show_date;
    const movie_desc = req.body.movie_desc

    db.query('INSERT INTO availableShow (movie, price, show_date, movie_desc) VALUES (?,?,?,?)', [movie, price, show_date, movie_desc], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Values inserted")
        }
    })
})

app.post('/bookMovie', (req, res) => {
    const id = req.body.id;

    db.query('INSERT INTO booked select * from availableShow where id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.send("Booking Done!")
        }
    })
})

app.post('/cancelBooking', (req, res) => {
    const id = req.body.id;

    db.query('DELETE FROM booked WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.send("Booking Cancelled!")
        }
    })
})

app.get('/getMovies', (req, res) => {
    db.query("SELECT * FROM availableShow", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.get('/getBooked', (req, res) => {
    db.query("SELECT * FROM booked", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log("running")
})