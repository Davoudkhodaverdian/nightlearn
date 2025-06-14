import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;
import homeRouter from './app-server';
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use('/', homeRouter);
app.listen(PORT, () => {
    console.log(`Express running on http://localhost:${PORT}`);
});

export default app;
