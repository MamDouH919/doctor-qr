import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const VideosSchema = new mongoose.Schema({
  path: { type: String, required: true },
  title: { type: String, required: true },
});

const SocialSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ["facebook", "instagram", "tikTok", "twitter", "snapChat", "youtube", "group", "Share", "website"] },
  link: { type: String, required: true },
});

const TestimonialsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  comment: { type: String, required: true },
  rate: { type: Number, required: true },
  status: { type: String, required: true, enum: ["pending", "approved", "rejected"], default: "pending" },
});

const ClientsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  phone: { type: String, required: true },
  whatsApp: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  color: { type: String, required: true },
  lang: { type: String, required: true, enum: ["ar", "en"] }, // Restrict to specific languages if needed
  about: { type: String, required: true },
  articles: [ArticleSchema],
  faq: [FAQSchema],
  videos: [VideosSchema], // Array of video URLs
  social: [SocialSchema], // Array of video URLs
  domain: { type: String, required: true },
  active: { type: Boolean, required: true, default: true },
  testimonials: [TestimonialsSchema],
  verificationCode: { type: String, },
  email: { type: String, required: true, default: "" },
  password: { type: String, required: true },
  token: { type: String, default: "" },
}, {
  timestamps: true,
  versionKey: false,
});

// Export the model
const Clients = mongoose.models?.Clients || mongoose.model("Clients", ClientsSchema);

export default Clients;
