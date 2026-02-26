import express from 'express';
import { UserController } from '../Controllers'
// import { AuthMiddleWare } from '../Middlewares';

const router = express.Router();

router.get('/:id', UserController.get);
router.put('/:id', UserController.update);
// router.get('', AuthMiddleWare.verifyToken, UserController.authorize);

export default router;
