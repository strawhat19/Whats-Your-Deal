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
    try{
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const { name, email, userStocks, userHistories} = req.body;
        const user = new userData({ name, email, password, userStocks, userHistories});
        const ret = await user.save();
        res.status(200).json(ret);
    } catch (err){
        res.json({status: 'Not Successfully', err})
    }
})

app.post('/api/login', (req, res) => {

    const {email, password} =req.body;
    
    userData.findOne(
        {email:email},(err,user) =>{
        if(user){

            const isPasswordValid = bcrypt.compare(
                	password,
                	user.password
            )

            if(isPasswordValid){
                res.send({message:"login successful",user:user})
            }else{
                res.send({message:"wrong credentials"})
            }
        }else{
            res.send({message:"Not Register"})
        }
    })
})



db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
  