import express from 'express';
import prisma from '../prisma';
import { z } from 'zod';

const router = express.Router();

const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

router.post('/', async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const student = await prisma.student.create({
      data: {
        fullName: data.fullName,
        email: data.email ?? null,
        phone: data.phone ?? null,
      },
    });

    // TODO: send welcome email/SMS via Twilio
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.params.id },
    });
    if (!student) return res.status(404).json({ error: 'not_found' });
    res.json(student);
  } catch (err) {
    next(err);
  }
});

export default router;
