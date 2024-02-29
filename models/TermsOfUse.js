import {Schema, model, models} from "mongoose";

const TermsOfUseSchema = new Schema({
    termsPage: {type: String, required: true},
})

export const TermsOfUse =  models.TermsOfUse || model('TermsOfUse', TermsOfUseSchema)
