import {Schema, model, models} from "mongoose";

const SupportSchema = new Schema(  {
              name:{type: String, required: true},
              email:{type: String, required: true},
              message: {type: String, required: true},
    }
,{
	timestamps: true,
});

export const Support =  models.Support || model('Support', SupportSchema)