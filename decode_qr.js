const Jimp = require("jimp");
const jsQR = require("jsqr");
const fs = require("fs");

const imagePath = "C:/Users/Carlos/.gemini/antigravity/brain/b0c56880-6d3b-43ac-9f80-5898fe711109/uploaded_image_1767728728314.png";

async function main() {
    if (!fs.existsSync(imagePath)) {
        console.error("File not found:", imagePath);
        process.exit(1);
    }

    try {
        console.log("Reading image...");
        const { Jimp } = require("jimp");

        const image = await Jimp.read(imagePath);
        const { data, width, height } = image.bitmap;
        const code = jsQR(data, width, height);

        if (code) {
            console.log("QR_CONTENT_START");
            console.log(code.data);
            console.log("QR_CONTENT_END");
        } else {
            console.error("No QR code found in image.");
            process.exit(1);
        }
    } catch (error) {
        console.error("Error processing image:", error);
        process.exit(1);
    }
}

main();
