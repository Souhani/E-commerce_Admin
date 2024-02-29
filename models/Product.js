import mongoose, {Schema, model, models} from "mongoose";

const ProductSchema = new Schema({
    title: {type: String, required: true},
    machines: {type: String, required: true},
    subtitle: {type: String, required: true},
    description: String,
    thumbnail: {type: String, required: true},
    properties: [{
        property: 
            {
                title: {type: String, required: true},
                description : {type: String, required: true},
            }
        ,
        image: String,
    }],
    testimonials: [
      {
        comment: {type: String, required: true},
        user: {
            name: {type: String, required: true},
            image: String
        }
      }
    ],
    features: [
        {
            title: {type: String, required: true},
        }
    ],
    files: [
        {
              machine: {type: String, required: true},
              version:{type: String, required: true},
              file: {type: String, required: true},
              size: {type: String, required: true},
        }
    ]
}, {
	timestamps: true,
});

export const Product =  models.Product || model('Product', ProductSchema)