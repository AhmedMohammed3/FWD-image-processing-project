import cors from 'cors';
import express from 'express';

import routes from './routes/routes';

const PORT = 3000;

const app = express();
app.use(cors());

// use the routes
app.use('/api/images', routes);
// static files
app.use('/images', express.static('./src/assets/'));

// start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
