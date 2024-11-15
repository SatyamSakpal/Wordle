import express from 'express'
import cors from 'cors'
import todaysWord from './util/todaysWord'
import checkWord from './util/checkWord'
const path = require('path');
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())
 
// console.log(checkWord('spice'))

const PORT = process.env.PORT || 3000 

app.use(express.static(path.join(__dirname, "../build")));

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
})

app.post('/word/check/', (req, res) => {
    const currWord: string = req.body.guessedWord
    
    res.json(checkWord(currWord))
}) 

app.get('/word', (req, res) => {
    res.json(todaysWord)
})

app.listen(PORT,() => {
    console.log('listening on Port: ',PORT)
})
 
 