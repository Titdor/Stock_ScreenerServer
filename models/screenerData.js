const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const screenerDataSchema = new Schema({
    date:{
        type: String,
      
    },
    open:{
        type: Number,
        
    },
    high: {
        type: Number,
        
    },
    low: {
        type: Number,
        
    },
    volume: {
        type: String,
        
    },
    price: {
        type: Number,
        
    }
    ,
    change: {
        type: Number,
       
    },
    changePercent: {
        type: String,
        
    },
    symbol:{
        type:String,
       
    },
    logo: {
        type:String
    },
    name: {
        type:String
    },
    currency: {
        type:String
    },
    industry: {
        type:String
    }
},{timestamps:true})

ScreenerData = mongoose.model("Data", screenerDataSchema);
module.exports = ScreenerData;
