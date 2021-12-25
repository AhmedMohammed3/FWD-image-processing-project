import { isImageExist, getResizedImage } from '../controllers/images';
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
        console.log(imagePath);
        expect(isImageExist(imagePath)).toBe(false);
    });
});
