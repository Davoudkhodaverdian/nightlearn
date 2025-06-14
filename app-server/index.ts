import express from 'express';
import { Request, Response } from 'express';
import apiRouter from './api';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send(`Home route (main route)`);
})
router.use('/api', apiRouter);

export default router;