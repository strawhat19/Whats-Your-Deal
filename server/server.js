const express = require('express');
const cors = require('cors');
const db = require(`./config/connection`);
const userData = require('./models/User');
const bcrypt= require('bcrypt');
const app = express();

const PORT = 8080;

app.use(cors())
app.use(express.json())

app.post('/api/register', async(req, res) => {
    // console.log(req.body)
    try{
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const { name, email, userStocks} = req.body;
        const user = new userData({ name, email, password, userStocks});
        console.log(user);
        const ret = await user.save();
        console.log(ret);
        res.status(200).json(ret);
    } catch (err){
        console.log(err)
        res.json({status: 'Not Successfully'})
    }
})

app.post('/api/login', async (req, res) => {
    const userFound = await userData.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    if (!userFound) {
        return { status: 'error', error: 'Invalid login' }
    }
    if (userFound.password) {
        return res.json({ status: 'ok', userFound: true })
    } else {
        return res.json({ status: 'error', userFound: false })
    }
})

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
  