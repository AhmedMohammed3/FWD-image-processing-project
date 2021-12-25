import express from 'express';
import { getResizedImage } from '../controllers/images';

const Router = express.Router();

Router.get('/', getResizedImage);
export default Router;
