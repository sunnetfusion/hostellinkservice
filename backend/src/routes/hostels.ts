import express from 'express';
import prisma from '../prisma';

const router = express.Router();

// GET approved hostels (listings)
router.get('/', async (req, res, next) => {
  try {
    const hostels = await prisma.hostel.findMany({
      where: { approved: true },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        facilities: true,
        photos: true,
        distanceMeters: true,
        caretakerId: true,
      },
    });
    res.json(hostels);
  } catch (err) {
    next(err);
  }
});

// GET hostel details
router.get('/:id', async (req, res, next) => {
  try {
    const hostel = await prisma.hostel.findUnique({
      where: { id: req.params.id },
      include: { caretaker: { select: { id: true, fullName: true } } },
    });
    if (!hostel) return res.status(404).json({ error: 'not_found' });
    res.json(hostel);
  } catch (err) {
    next(err);
  }
});

export default router;
