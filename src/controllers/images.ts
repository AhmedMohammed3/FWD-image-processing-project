import { resizeImage } from '../utilities/utilities';
import { Request, Response } from 'express';

// GET /images/?filename=""&width=0&height=0
export const getResizedImage = (req: Request, res: Response): void => {
    // get the image
    if (!req.query.filename) {
        res.status(400).send('Filename is required');
        return;
    }
    const filename = req.query.filename.toString();
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    if (!width || !height) {
        res.status(400).send('Width and height are required');
        return;
    }
    resizeImage(
        filename,
        width,
        height,
        (errmsg: string, statusCode: number): void => {
            if (errmsg) {
                res.status(statusCode).send(errmsg);
                return;
            }
        },
        (resizedImagePath: string): void => {
            res.sendFile(resizedImagePath);
            return;
        },
    );
};
