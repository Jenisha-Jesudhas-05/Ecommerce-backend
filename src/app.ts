import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import productRoutes from "./modules/product/product.routes";
import orderRoutes from "./modules/order/order.routes";
import featuredRoutes from "./modules/featured/featured.routes";
import cartRoutes from "./modules/cart/cart.routes";

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/featured", featuredRoutes);

export default app;
