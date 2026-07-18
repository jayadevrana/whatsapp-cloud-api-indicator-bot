import dotenv from "dotenv";
import path from "node:path";

dotenv.config();

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function normalizeDigits(value) {
  return value.replace(/[^\d]/g, "");
}

const ownerPhone = required("OWNER_PHONE_E164");
const ownerDigits = normalizeDigits(ownerPhone);

export const config = {
  port: Number(process.env.PORT || 3001),
  verifyToken: required("WHATSAPP_VERIFY_TOKEN"),
  accessToken: required("WHATSAPP_ACCESS_TOKEN"),
  phoneNumberId: required("WHATSAPP_PHONE_NUMBER_ID"),
  businessName: process.env.BUSINESS_NAME || "Pine Script Studio",
  assistantName: process.env.ASSISTANT_NAME || "Indicator AI",
  defaultCountryHint: process.env.DEFAULT_COUNTRY_HINT || "India",
  ownerPhone,
  ownerWhatsappUrl: process.env.OWNER_WHATSAPP_URL || `https://wa.me/${ownerDigits}`,
  ownerCallUrl: process.env.OWNER_CALL_URL || `tel:${ownerPhone}`,
  catalogPath: path.resolve(process.cwd(), process.env.CATALOG_PATH || "./data/indicator-catalog.json")
};
