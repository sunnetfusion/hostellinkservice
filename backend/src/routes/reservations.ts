import express from 'express';
import prisma from '../prisma';
import { z } from 'zod';
import { add } from 'date-fns';

const router = express.Router();

const createReservationSchema = z.object({
  studentId: z.string().uuid(),
  hostelId: z.string().uuid(),
  depositAmount: z.number().int().positive(),
  providerRef: z.string().optional(),
});

router.post('/', async (req, res, next) => {
  try {
    const body = createReservationSchema.parse(req.body);

    const expiresAt = add(new Date(), { hours: 48 });

    const reservation = await prisma.reservation.create({
      data: {
        studentId: body.studentId,
        hostelId: body.hostelId,
        depositAmount: body.depositAmount,
        status: 'PENDING',
        expiresAt,
      },
    });

    const payment = await prisma.payment.create({
      data: {
        provider: 'paystack',
        providerRef: body.providerRef ?? \`local-\${Date.now()}\`,
        amount: body.depositAmount,
        status: 'PENDING',
        studentId: body.studentId,
        reservationId: reservation.id,
      },
    });

    res.status(201).json({ reservation, payment });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: req.params.id },
      include: { payments: true, hostel: true },
    });
    if (!reservation) return res.status(404).json({ error: 'not_found' });
    res.json(reservation);
  } catch (err) {
    next(err);
  }
});

export default router;
