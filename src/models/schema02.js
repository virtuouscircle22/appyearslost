const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SchemaMuertes_prematuras = new Schema({
    Country: String,
    Population_mill: Number,
    Anual_mean_PM25: Number,
    Pre_deaths_PM25: Number,
    Anual_mean_NO2: Number,
    Pre_deaths_NO2: Number,
    Anual_mean_O3: Number,
    Pre_deaths_O3: Number,
    Total_deaths: Number,
    Relative_10k_hab: Number,
    Lenght: Number,
    Magnitude: Number
});

module.exports = mongoose.model('muertes_prematuras', SchemaMuertes_prematuras)
