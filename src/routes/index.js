const express = require('express')
const router = express.Router()

const Anos_perdidos = require ('../models/schema01')
const Muertes_prematuras = require ('../models/schema02')

/*=======================PÁGINA DE INICIO=======================*/
router.get('/', async (req, res) =>{
    //const anos_perdidos = await Anos_perdidos.find().sort( { Country: 1 } )
    res.render('inicio');
});
/*=======================PÁGINA DE INICIO=======================*/

/*=======================TABLAS=======================*/
//Tabla de los años perdidos por contaminantes.
router.get('/tabla_anos', async (req, res) =>{
    const anos_perdidos = await Anos_perdidos.find().sort( { Country: 1 } )
    res.render('tabla_anos', {
        anos_perdidos
    });
});
//Tabla de las muertes prematuras.
router.get('/tabla_muertes', async (req, res) =>{
    const muertes_prematuras = await Muertes_prematuras.find().sort( { Country: 1 } )
    res.render('tabla_muertes', {
        muertes_prematuras
    });
});
/*=======================TABLAS=======================*/

/*=======================GRÁFICAS=======================*/
//Gráfico de años perdidos por contaminantes (3 líneas).
router.get('/grafica01_anos', async (req, res) => {
  const anos_perdidos = await Anos_perdidos.find().sort( { Country: 1 } )
  res.render('grafica01_anos', {
    anos_perdidos
  });
});
//Total de años perdidos.
router.get('/grafica02_anos', async (req, res) => {
  const anos_perdidos = await Anos_perdidos.find().sort( { Country: 1 } )
  res.render('grafica02_anos', {
    anos_perdidos
  });
});
// Formulario de selección con get y post
router.get('/grafica03_anos_get', async (req, res) => {
  const anos_perdidos = await Anos_perdidos.find().sort( { Country: 1 } )
  res.render('grafica03_anos_get', {
    anos_perdidos
  });
});

router.post('/grafica03_anos_post', async (req, res) => {
  let paises = req.body.paises
  if (typeof paises != 'object'){
    res.redirect('/grafica03_anos_get')
  }else{
    const datos = await Anos_perdidos.aggregate([
      {
          $project: {
              _id: 0,
              Country: 1,
              YLL_Hab_PM25:1,
              YLL_Hab_NO2:1,
              YLL_Hab_O3:1
          }
      },
      {
          $match: {
              Country: {$in: paises}
          }
      },
      {
        $sort: {
          Country: 1
        }
      }
  ])
    res.render('grafica03_anos_post', {
      datos
    });
  }
});

//Gráfico de muertes prematuras por contaminantes (3 líneas).
router.get('/grafica01_muertes', async (req, res) => {
  const muertes_prematuras = await Muertes_prematuras.find().sort( { Country: 1 } )
  res.render('grafica01_muertes', {
    muertes_prematuras
  });
});
//Total de muertes prematuras.
router.get('/grafica02_muertes', async (req, res) => {
  const muertes_prematuras = await Muertes_prematuras.find().sort( { Country: 1 } )
  res.render('grafica02_muertes', {
    muertes_prematuras
  });
});
// Formulario de selección con get y post
router.get('/grafica03_muertes_get', async (req, res) => {
  const muertes_prematuras = await Muertes_prematuras.find().sort( { Country: 1 } )
  res.render('grafica03_muertes_get', {
    muertes_prematuras
  });
});

router.post('/grafica03_muertes_post', async (req, res) => {
  let paises = req.body.paises
  if (typeof paises != 'object'){
    res.redirect('/grafica03_muertes_get')
  }else{
    const datos = await Muertes_prematuras.aggregate([
      {
          $project: {
              _id: 0,
              Country: 1,
              Total_deaths: 1,
              Relative_10k_hab: 1,
              Population_mill: 1,
              Pre_deaths_PM25: 1,
              Pre_deaths_NO2: 1,
              Pre_deaths_O3: 1
          }
      },
      {
          $match: {
              Country: {$in: paises}
          }
      },
      {
        $sort: {
          Country: 1
        }
      }
  ])
    console.log(datos)
    res.render('grafica03_muertes_post', {
      datos
    });
  }
});

/*=======================GRÁFICAS=======================*/

/*=======================MAPAS=======================*/
//Círculo por total de años perdidos por país.
router.get('/mapa_anos', async (req, res) =>{
    const anos_perdidos = await Anos_perdidos.find().sort( { Country: 1 } )
    res.render('mapa_anos', {
      anos_perdidos
    });
});
//Círculo por total de muertes prematuras por país.
router.get('/mapa_muertes', async (req, res) =>{
    const muertes_prematuras = await Muertes_prematuras.find().sort( { Country: 1 } )
    //console.log(anos_perdidos)
    res.render('mapa_muertes', {
      muertes_prematuras
    });
});


/*=======================MAPAS=======================*/
module.exports= router
