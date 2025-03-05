const express = require('express');
const Rider = require('../models/Rider');
const router = express.Router();

// Fetch Rider Profile & Calculate Adjusted Premium
router.get('/profile/:id', async (req, res) => {
  const rider = await Rider.findById(req.params.id);
  if (!rider) return res.status(404).json({ message: 'User not found' });

  // Premium Calculation Logic
  const basePremium = 350;
  const discounts = {
    safetyScore: rider.safetyScore > 80 ? -52.50 : -20.00,
    routeSelection: rider.routeSelection > 75 ? -35.00 : -10.00
  };
  const surcharges = {
    nightRiding: rider.nightRiding > 50 ? 17.50 : 5.00
  };
  const adjustedPremium = basePremium + Object.values(discounts).reduce((a, b) => a + b, 0) + 
                         Object.values(surcharges).reduce((a, b) => a + b, 0);

  // Return Rider Data
  res.json({
    name: rider.name,
    safetyScore: rider.safetyScore,
    speedCompliance: rider.speedCompliance,
    routeSelection: rider.routeSelection,
    brakingBehavior: rider.brakingBehavior,
    nightRiding: rider.nightRiding,
    basePremium,
    adjustedPremium: adjustedPremium.toFixed(2),
    discounts,
    surcharges
  });
});

module.exports = router;
