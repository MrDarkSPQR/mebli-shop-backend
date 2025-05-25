const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  try {
    const { customerInfo, orderItems, totalAmount, paymentMethod, cardInfo, userId } = req.body;

    const newOrder = new Order({
      userId: userId || null,
      customerInfo,
      orderItems: orderItems.map(item => ({
        productId: item.productId, 
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount,
      paymentMethod,
      cardInfo: paymentMethod === 'card' ? cardInfo : null
    });

    await newOrder.save();
    res.status(201).json({ message: "Замовлення успішно створено", order: newOrder });
  } catch (error) {
    console.error("Помилка при створенні замовлення:", error);
    res.status(500).json({ message: "Помилка сервера при створенні замовлення", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Помилка при отриманні замовлень:", error);
    res.status(500).json({ message: "Помилка сервера при отриманні замовлень", error: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userOrders = await Order.find({ userId: userId });
    res.status(200).json(userOrders);
  } catch (error) {
    console.error("Помилка при отриманні замовлень користувача:", error);
    res.status(500).json({ message: "Помилка сервера при отриманні замовлень користувача", error: error.message });
  }
});

module.exports = router;