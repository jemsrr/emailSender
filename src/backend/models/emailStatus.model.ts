import mongoose from "mongoose";

const EmailStatusSchema = new mongoose.Schema({
  EmailSubject: { type: String },
  isEmailSent: { type: Boolean, default: false },
  isEmailSeen: { type: Boolean, default: false },
});

const Emailstatus =
  mongoose.models.emailstatus ||
  mongoose.model("emailstatus", EmailStatusSchema);

export default Emailstatus;
