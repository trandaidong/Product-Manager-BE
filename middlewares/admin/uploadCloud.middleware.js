const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');


// cloundinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SERCET, 

    // cloud_name: "dt2itjyld",
    // api_key: "963242911373137",
    // api_secret: "KTWqGpu4gXXY48-gB-da-sN4S1w"
});
// end cloundinary

module.exports.upload = (req, res, next) => {
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) {
            let result = await streamUpload(req);
            console.log(result);
            console.log(req.file)
            req.body[req.file.fieldname] = result.url;
            next();
        }
        upload(req);
    }
    else {
        next();
    }
}