import { isImageExist, getResizedImage } from '../controllers/images';
import Request from 'request';
import path from 'path';

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

describe('getResizedImage', () => {
    var server;
    beforeAll(() => {
        server = require('../index');
    });
    describe('GET /', () => {
        it('should return a 400 status code with "Filename is required" message in body', async () => {
            Request.get('http://localhost:3000/api/images', (err, res) => {
                expect(res.body).toBe('Filename is required');
                expect(res.statusCode).toBe(400);
            });
        });
        it('should return a 404 status code with "Image not found" message in body', async () => {
            Request.get(
                'http://localhost:3000/api/images?filename=notfoundimage.jpg&width=100&height=100',
                (err, res) => {
                    expect(res.body).toBe('Image not found');
                    expect(res.statusCode).toBe(404);
                },
            );
        });
        it('should return a 400 status code with "Width and height are required" message in body', async () => {
            Request.get(
                'http://localhost:3000/api/images?filename=fjord.jpg',
                (err, res) => {
                    expect(res.body).toBe('Width and height are required');
                    expect(res.statusCode).toBe(400);
                },
            );
        });
        it('should return a 200 status code', async () => {
            Request.get(
                'http://localhost:3000/api/images?filename=fjord.jpg&width=100&height=100',
                (err, res) => {
                    expect(res.statusCode).toBe(200);
                },
            );
        });
    });
});
