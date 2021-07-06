const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SchemaAnos_perdidos = new Schema({
    Country: String,
    YLL_PM25: Number,
    YLL_Hab_PM25: Number,
    YLL_NO2: Number,
    YLL_Hab_NO2: Number,
    YLL_O3: Number,
    YLL_Hab_O3: Number,
    Lenght: Number,
    Magnitude: Number
});

module.exports = mongoose.model('anos_perdidos', SchemaAnos_perdidos)
