import express from 'express';
import { Request, Response } from 'express';
import authRouter from './auth';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send(`api route `);
})
router.use('/auth', authRouter);
export default router;