import express from 'express';
import { Request, Response } from 'express';
import loginRouter from './login';
import registerRouter from './register';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send(`auth route `);
})
router.use('/login', loginRouter);
router.use('/register', registerRouter);
export default router;