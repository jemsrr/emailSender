import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DB: any = process.env.DB_URI;

const connection = mongoose.connection;

const connect = () => {
  mongoose.connect(DB, { connectTimeoutMS: 30000 });
};

connection
  .on("connected", () => {
    console.log("%s Database Connected", "✔");
  })
  .on("disconnected", () => {
    console.log("%s Database Disconnected", "✗");
  })
  .on("error", (err: string) => {
    console.error(err);
    console.log(
      "%s MongoDB connection error. Please make sure MongoDB is running.",
      "✗"
    );
    process.exit();
  });

process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log(
      "%s Mongoose default connection is disconnected due to application termination.",
      "✗"
    );
    process.exit(0);
  } catch (err) {
    console.error("Error while closing the mongoose connection:", err);
    process.exit(1);
  }
});

export default connect
