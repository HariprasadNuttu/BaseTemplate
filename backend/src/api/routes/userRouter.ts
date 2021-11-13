import { Router } from 'express';
import  {UserController} from '../controller'
const router = Router();

router.get('/profile_details', UserController.profileDetails);

export default router;
