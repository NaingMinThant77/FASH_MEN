import express, { json, Response, Request } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db/dbConnect";
import errorHandler from "./middlewares/errorHandler";
import stripe from "stripe";
import TempCart from "./models/tempCart";
import Order from "./models/order";

dotenv.config({
  path: "./.env",
});

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

// stripe webhook integration
const endpointSecret = process.env.WEBHOOK_SECRET;
app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    console.log("Stripe webhook is online.");

    let event = req.body;
    if (endpointSecret) {
      const signature = req.headers["stripe-signature"];
      try {
        if (!signature) {
          throw new Error("Signature not found.");
        }
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } catch (err: any) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        res.sendStatus(400);
        return;
      }
    }

    switch (event.type) {
      case "checkout.session.completed":
        console.log("EVENT TYPE===>", event.type);

        try {
          const session = event.data.object;
          console.log(event.data, session);

          const userId = session.metadata.customerId;
          const email = session.metadata.customer;
          const bill = Number(session.metadata.bill);
          const tempCartId = session.metadata.tempCartId;

          if (!userId || !email || !bill || !tempCartId) {
            throw new Error("Missing some metadata");
          }

          const tempCart = await TempCart.findById(tempCartId);

          await Order.create({
            userId,
            customer: email,
            bill: bill,
            paymentIntentId: session.payment_intent,
            stripeSessionId: session.id,
            items: tempCart?.items,
            status: "paid",
          });

          await TempCart.findByIdAndDelete(tempCartId);
        } catch (err) {
          console.log(err);
        }
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    res.sendStatus(200);
  }
);
app.use(express.json());

// http://localhost:4000/stripe/webhook
//stripe listen --forward-to localhost:4000/stripe/webhook
//stripe trigger checkout.session.completed

// routes
import userRoutes from "./routes/user";
app.use("/api", userRoutes);
import productRoutes from "./routes/product";
app.use("/api/products", productRoutes);
import orderRoutes from "./routes/order";
app.use("/api", orderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || "8000";
app.listen(PORT, () => {
  // database connection
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
