import { v4 as uuidv4 } from "uuid";
import { addHours } from "date-fns";

export const generateVerificationToken = () => {
  const token = uuidv4(); // Generate a unique token
  const tokenExpiration = addHours(new Date(), 24); // Token expires in 24 hours
  return { token, tokenExpiration };
};

export const generateResetToken = () => {
  const token = uuidv4(); // Generate a unique token
  const tokenExpiration = addHours(new Date(), 1); // Token expires in 1 hour
  return { token, tokenExpiration };
};
