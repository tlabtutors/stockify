import crypto from "crypto";
//currency formatter
export const moneyFormatter = (amount, currency) => {
  try {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    });
    if (formatted) {
      return formatted.format(amount, currency);
    } else {
      throw new Error("Unable to connect the endpoint");
    }
  } catch (error) {
    throw new Error("Error occured: ", error);
  }
};

export const capitalizeFirstLetter = (word) => {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const lowerAllButFirst = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);

  const interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  if (interval === 1) {
    return interval + " year ago";
  }

  const months = Math.floor(seconds / 2628000);
  if (months > 1) {
    return months + " months ago";
  }
  if (months === 1) {
    return months + " month ago";
  }

  const days = Math.floor(seconds / 86400);
  if (days > 1) {
    return days + " days ago";
  }
  if (days === 1) {
    return days + " day ago";
  }

  const hours = Math.floor(seconds / 3600);
  if (hours > 1) {
    return hours + " hours ago";
  }
  if (hours === 1) {
    return hours + " hour ago";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes > 1) {
    return minutes + " minutes ago";
  }
  if (minutes === 1) {
    return minutes + " minute ago";
  }
  return "just now";
};

export const genUniqueString = (length) => {
  const xters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * xters.length);
    result += xters[randomIndex];
  }
  return result;
};

export const tokenizer = (intValue) => {
  const token = crypto.randomBytes(intValue).toString("hex");
  return token;
};
export const tokenizerHash = (token) => {
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  return hash;
};

export const add2Nums = (v1, v2) => {
  const result = v1 + v2;
  return result;
};

export const subs2Nums = (v1, v2) => {
  const result = v1 - v2;
  return result;
};
