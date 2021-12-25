import fs from 'fs';
import path from 'path';

import sharp from 'sharp';
import { Request, Response } from 'express';

// funtion to check if the image exists
export const isImageExist = (imagePath: string) => {
    if (fs.existsSync(imagePath)) {
        return true;
    }
    return false;
};
// GET /images/?filename=""&width=0&height=0
export const getResizedImage = (req: Request, res: Response) => {
    // get the image
    const filename = req.query.filename;
    if (!filename) {
        res.status(400).send('Filename is required');
        return;
    }
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    if (!width || !height) {
        res.status(400).send('Width and height are required');
        return;
    }
    const imagePath = path.join(__dirname, `../../assets/full/${filename}`);
    const targetPath = path.join(
        __dirname,
        `../../assets/thumb/${filename}-${width}*${height}.jpg`,
    );
    // check if the image exists
    if (!isImageExist(imagePath)) {
        res.status(404).send('Image not found');
        return;
    }
    // check if targetPath exists and send it if it does
    if (isImageExist(targetPath)) {
        console.log('Sent Already exist image!');
        res.sendFile(targetPath);
        return;
    }
    // if it doesn't exist, resize the image and send it
    const inStream = fs.createReadStream(imagePath);
    const outStream = fs.createWriteStream(targetPath);

    outStream.on('error', (err) => {
        console.log(err);
        res.status(500).send('Server Error');
    });

    outStream.on('close', () => {
        console.log('resized successfuly');
        res.status(200).sendFile(targetPath);
    });

    const resizedImage = sharp().resize({ width, height });
    inStream.pipe(resizedImage).pipe(outStream);
};
