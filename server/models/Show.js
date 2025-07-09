import mongoose from "mongoose";

const shoeSchema = new mongoose.Schema(
    {
        movie: {type:String, required:true},
        showDateTime:{type:Date, required:true},
        showPrice:{type:Number, required:true},
        occupiedSeats:{type:Object, default:{}}
    },{minimize:false}
)

const Show= mongoose.model("Show", shoeSchema)
export default Show;