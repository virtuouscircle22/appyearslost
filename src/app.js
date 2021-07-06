const path = require('path')
const express = require ('express')
const morgan = require('morgan')
const mongoose = require ('mongoose')

const app = express()

//Conectarnos a una base de datos.
const atlasURL = 'mongodb+srv://aire:aire@cluster0.7gnbs.mongodb.net/Aire?retryWrites=true&w=majority'
const atlasPrURL = 'mongodb+srv://jaime:jaime@cluster0-mms5n.mongodb.net/Aire?retryWrites=true&w=majority'
const localURL = 'mongodb://localhost:27017/calidad_aire'

mongoose.connect(atlasPrURL, { useNewUrlParser: true, useUnifiedTopology:true} )
    .then(db => console-log('Conectado a la BD'))
    .catch(error => console.log(error))

//Importar mis rutas.
const indexRoutes = require('./routes/index')
const { log } = require('console')

//Configuración.
app.set('port', process.env.PORT || 4300)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static(__dirname + "/public"));

//Llamadas antes de arrancar
app.use(morgan('dev'))
//Para que use el body en los formularios
app.use(express.urlencoded({extended:false}))

//Routes.
app.use('/', indexRoutes)

//Arrancando el servidor.
app.listen (app.get('port'), () => {
    console.log (`Servidor en el puerto ${app.get('port')}`)
})
