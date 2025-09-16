import mongoose from "mongoose";
import { Product } from "../models/product";
import { products } from "./data";

async function seed() {
  try {
    await mongoose.connect("mongodb://localhost:27017/fash-project");
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
}

seed();
