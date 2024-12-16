const categoryModel = require("../../Models/Category.js");

// Insert/Add API
exports.create = async (request, response) => {

    //for a single image
    console.log(request.file);

    //for multiple image
    // console.log(request.files);

    const data = new categoryModel({
        name : request.body.category_name,
        // image : request.body.category_image,
        status : request.body.category_status,
        order : request.body.category_order
    })

    await data.save()
    .then((result) => {
        const resp = {
            status : true,
            message : 'Category Added Successfully',
            data : result
        }
        response.send(resp);
    })
    .catch((error) => {
        //Index Array
        var errormessages = [];

        //for-in loop is used to get the number of the index
        for(var value in error.errors){
            errormessages.push(error.errors[value].message);
        }

        const resp = {
            status : false,
            message : 'Something went wrong !!',
            data : '',
            error : errormessages
        }
        response.send(resp);
    })
}

// View API
exports.index = async (request, response) => {

//Conditions and multiple functionalities of "view"

    // await categoryModel.find({ deleted_At : null })  //  (2.1) condition
    // await categoryModel.find({ deleted_At : null, status : true }) //   (2.2) condition

    //findOne() & findById() is used to view a single record
    // await categoryModel.findOne({ _id : request.params.id, deleted_At : null, status : true })
    // await categoryModel.findById(request.params.id)    // conditions are not applicable



    
    //Select Query Method to get the response of the selected fields/keys
    // await categoryModel.find({ deleted_At : null, status : true }).select('name image')

    // "limit & skip" functionality for Pagenation or response based on request
//     console.log(request.body.limit);

//     if(request.body.limit == undefined){
//          var limit = 6;
//     } else{
//         var limit = request.body.limit;
//     }

//     if(request.body.page == undefined || request.body.page < 1){
//         var page = 1;
//    } else{
//        var page = request.body.page;
//    }

//    var skip = (page - 1) * limit;   

//     await categoryModel.find({ deleted_At : null, status : true }).select('name image').limit(limit).skip(skip)


    //Comparison Operators of Select Query Method
    // await categoryModel.find(
    //     {   deleted_At : null, 
    //         status : true, 
    //         order : {   
    //             $gt : 1,  //records whose order-value is greater than 1
    //         } 
    //     })
    // .select('name image status order')


    //Sorting in Select Query Method
    // await categoryModel.find(
    //     {   deleted_At : null, 
    //         status : true, 
    //     })
    //     .sort({ order : 'asc', _id : 'desc' })
    // .select('name image status order')


    // Regular Expression: find documents matching a pattern
    // Condition 1: it checks the condition with the word's starting letters as it is small letter or capital everything counts
    // var nameRegex = new RegExp("^" + request.body.name);

    //Condition 2(best): Everything if letter whether small or capital that matched with the word it shows us the record
    var nameRegex = new RegExp(request.body.name, "i");

    await categoryModel.find(
        {   deleted_At : null, 
            status : true, 
            name : nameRegex,
        })
        .sort({ order : 'asc', _id : 'desc' })
    .select('name image status order')

    .then((result) => {

        if(result.length > 0){
            const resp = {
                status : true,
                message : 'Record Found Successfully',
                data : result,
            }
            response.send(resp);

        } else {
            const resp = {
                status : false,
                message : 'No Record Found',
                data : [],
            }
            response.send(resp);
        }
    })
    .catch((error) => {
        const resp = {
            status : false,
            message : 'Something went wrong !!',
            data : '',
            error : error
        }
        response.send(resp);
    })

}

// Details API for a single category record through findOne() & findById()
exports.details = async (request, response) => {

    // await categoryModel.findOne({ _id : request.params.id, deleted_At : null })

    await categoryModel.findById(request.params.id)
    .then((result) => {

        // console.log(result);
        if(result != null){
            const resp = {
                status : true,
                message : 'Record Found Successfully',
                data : result,
            }
            response.send(resp);

        } else {
            const resp = {
                status : false,
                message : 'No Record Found',
                data : [],
            }
            response.send(resp);
        }
    })
    .catch((error) => {
        const resp = {
            status : false,
            message : 'Something went wrong !!',
            data : '',
            error : error
        }
        response.send(resp);
    })

}

// Update API
exports.update = async (request, response) => {
    
    await categoryModel.updateOne(
        {
            _id : request.params.id
        },
        {
            $set : {
                name : request.body.category_name,
                image : request.body.category_image,
                status : request.body.category_status,
                order : request.body.category_order
            }
        }
    ).then((result) => {

        var resp = {
            status : true,
            message : 'Record Updated Successfully.',
            data : result
        }
        response.send(resp);

    }).catch((error) => {
        //Index Array
        var errormessages = [];

        //for-in loop is used to get the number of the index
        for(var value in error.errors){
            console.log(value);
            errormessages.push(error.errors[value].message);
        }

        const resp = {
            status : false,
            message : 'Something went wrong !!',
            data : '',
            error : errormessages
        }
        response.send(resp);
    })

}

// Soft-Delete API through updateOne()
exports.destroy = async (request, response) => {

    await categoryModel.updateOne(
        {
            _id : request.params.id
        },
        {
            $set : {
                deleted_At : Date.now(),
            }
        }
    ).then((result) => {

        var resp = {
            status : true,
            message : 'Record Deleted Successfully.',
            data : result
        }
        response.send(resp);

    }).catch((error) => {
        //Index Array
        var errormessages = [];

        //for-in loop is used to get the number of the index
        for(var value in error.errors){
            console.log(value);
            errormessages.push(error.errors[value].message);
        }

        const resp = {
            status : false,
            message : 'Something went wrong !!',
            data : '',
            error : errormessages
        }
        response.send(resp);
    })

}