const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const graphDataSchema = new Schema({
        symbol:{
            type:String,
           
        },
        values:[{
            datetime:{
                type:String,
               
            },
            open:{
                type:Number,
                
            },
            close:{
                type:Number,
              
            },
            high:{
                type:Number,
               
            },
            low:{
                type:Number,
                
            },
            volume:{
                type:Number,
               
            },
        }]
},{timestamps:true})

graphData = mongoose.model("graphData", graphDataSchema);
module.exports = graphData;