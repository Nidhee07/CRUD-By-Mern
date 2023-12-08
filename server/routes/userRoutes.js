// routes/userRoutes.js
import express from 'express';
import { create, deleteUser, getAll, getOne, update } from '../controller/userController.js';

const router = express.Router();

// Create item
router.post('/create', create);

// Read items
router.get('/getAll', getAll);
router.get('/getOne/:id', getOne);

// Update item
router.put('/update/:id', update);

// Delete item
router.delete('/delete/:id', deleteUser);

export default router;
