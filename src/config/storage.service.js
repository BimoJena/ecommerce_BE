import ImageKit from "@imagekit/nodejs";
import dotenv from 'dotenv';
dotenv.config();

const imagekit = new ImageKit({
    privateKey: process.env['IMAGEKIT_PRIVATE_KEY']
});

async function uploadFile(buffer){
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: `product_${Date.now()}.jpg`
    })
    return result;
}

export default uploadFile;