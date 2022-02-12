const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');

const uploadRouter = require('./router/Upload')
const app  = express()
const port = process.env.PORT || 3001 
dotenv.config()


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("DB CONNECTED"))
.catch(err=>console.log(err))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));
app.use(cors());

app.use("/",uploadRouter)

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('/BackEnd/client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,'BackEnd', 'client', 'build', 'index.html'));
    });
}

app.listen(port,()=>{
    console.log(`Running app at port: ${port}`)
})