import {Schema, model, models} from "mongoose";

const FaqSchema = new Schema({
    faq: [
        {
            question: {type: String, required: true},
            answer: {type: String, required: true}
        }
    ],
})

export const Faq =  models.Faq || model('Faq', FaqSchema)
