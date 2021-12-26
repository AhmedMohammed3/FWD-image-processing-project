import Request from 'request';

describe('getResizedImage', (): void => {
    beforeAll((): void => {
        require('../index');
    });
    describe('GET /', (): void => {
        it('should return a 400 status code with "Filename is required" message in body', (): void => {
            Request.get(
                'http://localhost:3000/api/images',
                (err, res): void => {
                    expect(res.body).toBe('Filename is required');
                    expect(res.statusCode).toBe(400);
                },
            );
        });
        it('should return a 404 status code with "Image not found" message in body', (): void => {
            Request.get(
                'http://localhost:3000/api/images?filename=notfoundimage.jpg&width=100&height=200',
                (err, res): void => {
                    expect(res.body).toBe('Image not found');
                    expect(res.statusCode).toBe(404);
                },
            );
        });
        it('should return a 400 status code with "Width and height are required" message in body', (): void => {
            Request.get(
                'http://localhost:3000/api/images?filename=fjord.jpg',
                (err, res): void => {
                    expect(res.body).toBe('Width and height are required');
                    expect(res.statusCode).toBe(400);
                },
            );
        });
        it('should return a 200 status code', (): void => {
            Request.get(
                'http://localhost:3000/api/images?filename=fjord.jpg&width=150&height=100',
                (err, res): void => {
                    expect(res.statusCode).toBe(200);
                },
            );
        });
    });
});
