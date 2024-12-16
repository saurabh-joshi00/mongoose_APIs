const mongoose = require('mongoose');

//Schema declaration with Validation Methods
const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required.'],
        // minLength : [5, 'Character value must be greater than or equal to 5'],
        // maxLength : [15, 'Character value must be shorter than or equal to 15'],
        // enum : ['Men', 'Women'],
        match: /^[a-z '&A-Z]{2,20}$/,
    },
    image : {
        type : String,
        required : [true, 'Image is required.'],
    },
    status : {
        type : Boolean,
        default : 1
    },
    order : {
        type : Number,
        default : 0
    },
    created_At : {
        type : Date,
        default : Date.now()
    },
    updated_At : {
        type : Date,
        default : Date.now()
    },
    deleted_At : {
        type : Date,
        default : ''
    },
});

//Model declaration by declaring collection-name and schema
const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;