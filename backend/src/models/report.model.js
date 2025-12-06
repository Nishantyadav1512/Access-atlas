import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    url:{
        type:String,
        required:true
    },
    lighthouseScore:{
        accessibility:{type:Number, min:0,max:100},
        performance:{type:Number, min:0,max:100},
        bestPractices:{type:Number, min:0,max:100},
        seo:{type:Number, min:0,max:100}
    },
    axeResults:{
        violations:[{
            id:String,
            description:String,
            impact: String,
            help:String,
            helpUrl:String,
            nodes:Array
        }],
        passes:Number,
        incomplete:Number
    },
    timestamp:{
        type:Date,
        default:Date.now
    }

});
reportSchema.index({userId:1,timestamp:-1});

export default mongoose.model('Report',reportSchema)