const express = require('express');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const fileupload = require('express-fileupload'); 
const ItemModel = require('../models/items');
router.use(fileupload({useTempFiles: true}))
// const cloudinary = require('cloudinary').v2;s

// cloudinary.config({
//   cloud_name: 'dhjrxapj5',
//   api_key: '536189383752947',
//   api_secret: 'your_api_secret',
// });

cloudinary.config({ 
    cloud_name: 'dhjrxapj5', 
    api_key: '536189383752947', 
    api_secret: 'J11hkxrweapY2QqTVFIC3rH2s0w' 
});

router.post('/', async (req, res) => {
    // console.log(100, req.user);
    // console.log(req.body.imageFiles);
    // console.log(req.body.imageFiles.files.file);
    // console.log(req.image_files.files);
    // console.log(req.body.general_info);
    console.log(req.user);
    const general_info_json = JSON.parse(req.body.general_info);
    const general_info = req.body.general_info;
    // console.log(69, general_info_json);
    // console.log(general_info_json.name);
    const upload_v = req.body.upload_present;
    // console.log(upload_v);
    const no_of_files = req.body.no_of_files;
    // general_info.forEach(gen => {
    //     console.log(gen.name);
    // })

    // const ;

    console.log(no_of_files);
    const urls = [];
    // console.log(files);
    general_info_json["imageURL"] = [];
    general_info_json["bids"] = [];
    var idx = 0;
    if (no_of_files > 0) {
        if (no_of_files == 1) {
            console.log(req.files.file);
            const file = req.files.file;
            try {
                const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
                general_info_json["imageURL"].push(uploadResult.secure_url);
                const item = new ItemModel(general_info_json);
                item.save();
                res.send(general_info_json);
                console.log(general_info_json);
            } catch (error) {
                console.log('Error uploading image:', error);
                const item = new ItemModel(general_info_json);
                item.save();
                res.send(general_info_json);
                console.log(general_info_json);
            }
        }
        else{
            const files = req.files.file;
            files.forEach(async (file)=>
            {
            try {
                // const file = req.files.file;
                const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
                // urls.push(uploadResult.secure_url);
                general_info_json["imageURL"].push(uploadResult.secure_url);
                // console.log(uploadResult.secure_url);
                // res.json({ url: uploadResult.secure_url });
                idx++;
                if(idx == no_of_files) 
                {
                    const item = new ItemModel(general_info_json);
                    item.save();
                    console.log(general_info_json);
                    res.send({
                        data: success,
                        message: "Item Added Successfully"
                    });
                }
            } catch (error) {
                console.log('Error uploading image:', error);
                // res.status(500).json({ error: 'Image upload failed' });
                idx++;
                if(idx == no_of_files) 
                {
                    const item = new ItemModel(general_info_json);
                    item.save();
                    console.log(general_info_json);
                    res.send({
                        data: success,
                        message: "Item Added Successfully"
                    });
                }
            }
            // console.log(general_info_json["imageURL"]);

            })
        }
    }
    else{
        const item = new ItemModel(general_info_json);
        item.save();
        res.send({
            data: "success",
            message: "Item Added Successfully"
        });
    }
    // res.json({url: urls});
});

module.exports = router;