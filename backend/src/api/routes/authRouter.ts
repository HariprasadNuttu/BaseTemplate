import { Router } from 'express';
import { celebrate , Joi } from 'celebrate';
import { AuthController } from '../controller';
const router = Router();

router.post('/sign_in', AuthController.login);
router.post('/signUp',AuthController.signUp);


export default router;
