import express from 'express';
import { StatController } from './stats.controller';

const router = express.Router();

router.get('/',StatController.getStats);

export const StatRoutes = router;
