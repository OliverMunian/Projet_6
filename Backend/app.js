const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const path = require('path')
var helmet = require('helmet');


const saucesRoutes = require('./Routes/Sauces');
const userRoutes = require('./Routes/User');

mongoose.connect('mongodb+srv://BVN3:tricky94@cluster0.deehr.mongodb.net/Userprojet6?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(helmet());
app.disable('x-powered-by');

app.use(bodyParser.json());

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/Images', express.static(path.join(__dirname, 'images')));

app.get('/test', (req, res, next)=>{
	console.log('coucou')
	res.status(200).json({status: 'OK'})
})


module.exports = app;