const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const dns = require('dns');

dns.lookup('upload.imagekit.io', (err, address) => {
    if (err) console.error("NETWORK ERROR: Cannot find ImageKit servers. Check your WiFi/DNS.");
    else console.log("NETWORK SUCCESS: ImageKit server found at", address);
});
async function uploadFile(fileBuffer, fileName) {
    try {
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: fileName,
            useUniqueFileName: true,
        });
        return response; 
    } catch (error) {
        if (error.code === 'ETIMEDOUT') {
            console.error("CRITICAL: Your network timed out while connecting to ImageKit.");
        }
        console.error("ImageKit Detail:", error);
        throw error; 
    }
}

// THIS IS WHAT YOU WERE MISSING
module.exports = {
    uploadFile
};