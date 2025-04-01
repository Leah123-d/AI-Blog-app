import express from 'express';

import {getaiImage} from '../controllers/aiController.js'

const router = express.Router();

router.post('/getaiImage', getaiImage);


export default router;