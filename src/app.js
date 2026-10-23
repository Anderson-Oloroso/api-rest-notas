import express from 'express';
import cookieParser from 'cookie-parser';
import { notaRouter } from './routes/nota.routes.js';
import { manejarError, rutaNoEncontrada } from './midllewares/error.middleware.js';

const API_VERSION = '1.0.0';

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use((req, res, next)=>{
   res.set('X-API-Version', API_VERSION);
   next();
})

app.get('/health', (req, res)=> res.status(200).json({ estado: 'OK', version: API_VERSION }));

app.get('/api/v1/preferencia', (req, res)=> {
   res.json({ ultimaCategoria: req.cookies.ultimaCategoria ?? nunll });
});

app.use('api/v1/notas', notaRouter);
app.use(rutaNoEncontrada);
app.use(manejarError);

export default app;