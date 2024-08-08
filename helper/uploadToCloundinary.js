const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');


// cloundinary
cloudinary.config({
    // cloud_name: process.env.CLOUD_NAME,
    // api_key: process.env.CLOUD_KEY,
    // api_secret: process.env.CLOUD_SERCET, 

    cloud_name: "dt2itjyld",
    api_key: "963242911373137",
    api_secret: "KTWqGpu4gXXY48-gB-da-sN4S1w"
});
// end cloundinary

let streamUpload = async (buffer) => {
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

        streamifier.createReadStream(buffer).pipe(stream);
    });
};
module.exports = async (buffer) => {
    let result = await streamUpload(buffer);
    return result.url;
}