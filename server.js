/*
 * MEAN angular - team manager
 * oct 17, 2018
 * shawn chen
 * codingDojo SJ
 */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const version = '1.0';

app.use(bodyParser.json());
app.use(express.static(__dirname + '/team/dist/team'));

app.listen(8000, function () {
    console.log(`Team Manager v.${version} - listening on port 8000`);
})

mongoose.connect('mongodb://localhost/teamManager', { useNewUrlParser: true });

const gameSchema = new mongoose.Schema({
    1: { type: String, default: 'undecided' },
    2: { type: String, default: 'undecided' },
    3: { type: String, default: 'undecided' }
}, { timestamps: true })

const teamSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Player name cannot be empty'], minlength: [2, 'Name must be 2 characters or longer'] },
    position: { type: String, default: 'None' },
    status: gameSchema
}, { timestamps: true })

const Team = mongoose.model('teams', teamSchema);

// routes here

// get the player roster
app.get('/players', (req, res) => {
    Team.find({}, (err, data) => {
        if (err) {
            console.log('error encountered fetching all players');
            res.json(err);
        }
        else {
            console.log(`fetched roster ${data}`);
            res.json(data);
        }
    })
})

// add a player
app.post('/addPlayer', (req, res) => {
    Team.create(req.body, (err, data) => {
        if (err) {
            console.log('error encountered inserting new player');
            res.json(err);
        }
        else {
            console.log(`added new player ${data}`);
            res.json(data);
        }
    })
})

// update player's game status
app.put('/setStatus', (req, res) => {
    let query = { $set: {[`status.${req.body.game}`]: req.body.status }};
    console.log(query);
    Team.updateOne({_id: req.body.uid}, query, (err, data) => {
        if (err) {
            console.log('error encountered updating player status');
            res.json(err);
        }
        else {
            console.log(`updated player status with --> ${data}`);
            res.json(data);
        }
    })
})

// delete player
app.delete('/delPlayer/:id', (req, res) => {
    Team.remove({_id: req.params.id}, (err, data) => {
        if (err) {
            console.log('error encountered deleting user');
            res.json(err);
        }
        else {
            console.log(`deleted player with result code --> ${data}`);
            res.json(data);
        }
    })
})


// resolve data to angular - index.html
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve('./team/dist/team/index.html'));
});