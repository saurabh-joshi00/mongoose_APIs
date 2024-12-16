const express = require('express');
const { create, index, update, destroy, details } = require('../../Controllers/Admin/categoryController');

const router = express.Router();
const path = require('path');
const multer  = require('multer')
const folder = multer({ dest: 'uploads/categories' })

//function for uploading and saving image permanently in the folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/categories')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      console.log(file);

      var imagePath = path.extname(file.originalname);
      console.log(imagePath);

      cb(null, file.fieldname + '-' + uniqueSuffix+imagePath)
    }
})
  
const upload = multer({ storage: storage }).single('category_image');

module.exports = server =>  {

    //for uploading a single image
    router.post('/add', upload, create);

    //for uploading multiple image
    // router.post('/add', upload.array('category_image', 12), create);

    //for uploading text-only format for default calling a n api whther it is made with form-data, json, or fom-urlencoded
    // router.post('/add', upload.none('category_image'), create);

    router.post('/view', index);

    router.post('/details/:id', details);

    router.put('/update/:id', update);

    router.delete('/delete/:id', destroy);

    server.use('/api/admin/categories', router);
}