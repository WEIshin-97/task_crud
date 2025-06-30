
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
    updatedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
},{
    timestamps: true
});

export const Product = mongoose.model('Product', ProductSchema);
