const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');
const path = require('path')

const uploadRouter = require('./router/Upload')
const app  = express()
const port = process.env.PORT || 3000 
dotenv.config()


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then()
.catch(err=>{})

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));
app.use(cors());

app.use("/",uploadRouter)

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('/fabrik_backend/fabrik_frontend/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,'fabrik_backend', 'fabrik_frontend', 'build', 'index.html'));
    });

}

app.listen(process.env.PORT || 3000,()=>{
    
})