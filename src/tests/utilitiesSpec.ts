import {
    isImageExist,
    makeThumbDirIfNotExist,
    resizeImage,
} from './../utilities/utilities';
import path from 'path';
import fs from 'fs';

// create a test for isImageExist
describe('isImageExist', () => {
    it('should return true if image exists', () => {
        const imagePath = path.join(__dirname, '../../assets/full/fjord.jpg');
        expect(isImageExist(imagePath)).toBe(true);
    });
    it('should return false if image does not exist', () => {
        const imagePath = path.join(
            __dirname,
            '../../assets/full/Nonexist.jpg',
        );
        expect(isImageExist(imagePath)).toBe(false);
    });
});

// create a test for makeThumbDirIfNotExist
describe('makeThumbDirIfNotExist', () => {
    it('should create thumb dir if it does not exist', () => {
        const thumbDir = path.join(__dirname, '../../assets/thumb');
        fs.rmSync(thumbDir, { recursive: true });
        expect(fs.existsSync(thumbDir)).toBe(false);
        makeThumbDirIfNotExist();
        expect(fs.existsSync(thumbDir)).toBe(true);
    });
});

// create a test for resizeImage
describe('resizeImage', () => {
    afterAll(() => {
        fs.rmSync(path.join(__dirname, '../../assets/thumb'), {
            recursive: true,
        });
    });
    it('should resize image and send it to client', (done) => {
        const width = 150;
        const height = 100;
        const errcb = (err, status) => {
            console.log(err);
            expect(status).toBe(500);
            done();
        };
        const successcb = (targetPath) => {
            expect(fs.existsSync(targetPath)).toBe(true);
            done();
        };
        resizeImage('fjord.jpg', width, height, errcb, successcb);
    });
    it('should return error if image does not exist', (done) => {
        const width = 300;
        const height = 200;
        const errcb = (errmsg, statusCode) => {
            expect(errmsg).toBe('Image not found');
            expect(statusCode).toBe(404);
            done();
        };
        const successcb = (resizedImagePath) => {
            expect(resizedImagePath).toBe(undefined);
            done();
        };
        resizeImage('Nonexist.jpg', width, height, errcb, successcb);
    });
});
