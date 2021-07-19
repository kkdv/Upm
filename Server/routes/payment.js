const express = require("express");
const router = express.Router();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Ik2o1SC4PUMUVRnc7upsTGRqCCdJn1zzaMNpRJihKtQzvxZKcIoBwVUeMLFoh5QPfrKYV4Fq7b6xYocB5g5OOAH00zfgRawvj"
);

router.post("/", cors(), async (req, res) => {
  let error;
  let status;
  try {
    const { token, amount } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: "INR",
      customer: customer.id,
    });
    status = "success";
  } catch (error) {
    status = "failure";
  }
  res.json({ error, status });
});

module.exports = router;
