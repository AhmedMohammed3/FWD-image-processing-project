import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

// funtion to check if the image exists
export const isImageExist = (imagePath: string): boolean => {
    if (fs.existsSync(imagePath)) {
        return true;
    }

    return false;
};

export const resizeImage = async (
    filename: string,
    width: number,
    height: number,
    errcb,
    successcb,
): Promise<void> => {
    const imagePath = path.join(__dirname, `../../assets/full/${filename}`);
    const targetPath = path.join(
        __dirname,
        `../../assets/thumb/${
            path.parse(imagePath).name
        }-${width}x${height}.jpg`,
    );

    if (!isImageExist(imagePath)) {
        errcb('Image not found', 404);
        return;
    }

    if (isImageExist(targetPath)) {
        successcb(targetPath);
        return;
    }

    makeThumbDirIfNotExist();

    const inStream = fs.createReadStream(imagePath);

    const outStream = fs.createWriteStream(targetPath);
    outStream.on('error', (err): void => {
        console.log(err);
        errcb('Server Error', 500);
        return;
    });
    outStream.on('close', (): void => {
        successcb(targetPath);
        return;
    });
    const resizedImage = await sharp().resize({ width, height });
    inStream.pipe(resizedImage).pipe(outStream);
};

export const makeThumbDirIfNotExist = (): void => {
    const thumbDir = path.join(__dirname, '../../assets/thumb');
    if (!fs.existsSync(thumbDir)) {
        fs.mkdirSync(thumbDir);
    }
};
