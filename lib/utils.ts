"use server";

import { headers } from "next/headers";

export const getOrigin = async () => {
  const h = await headers();
  return `${h.get("x-forwarded-proto") || "http"}://${h.get("host")}`;
};
