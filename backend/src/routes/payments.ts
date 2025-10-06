import express from 'express';
import prisma from '../prisma';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/webhook/paystack', express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }), async (req, res) => {
  try {
    const signature = req.headers['x-paystack-signature'] as string | undefined;
    const secret = process.env.PAYSTACK_SECRET || '';
    if (secret && signature) {
      const hash = crypto.createHmac('sha512', secret).update((req as any).rawBody).digest('hex');
      if (hash !== signature) return res.status(400).send('invalid signature');
    }

    const evt = req.body;
    if (evt?.event === 'charge.success' && evt?.data) {
      const providerRef = evt.data.reference;
      const amount = Math.floor(evt.data.amount / 100);
      await prisma.payment.updateMany({
        where: { providerRef },
        data: { status: 'SUCCESS', amount },
      });

      const payRec = await prisma.payment.findUnique({ where: { providerRef } });
      if (payRec?.reservationId) {
        await prisma.reservation.update({
          where: { id: payRec.reservationId },
          data: { depositPaidAt: new Date(), status: 'PENDING' },
        });
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
});

export default router;
