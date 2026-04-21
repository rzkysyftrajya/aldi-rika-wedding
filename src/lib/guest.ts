// Hook & helper untuk membaca nama tamu dari URL (?to=Nama%20Tamu)
import { useEffect, useState } from "react";

export const getGuestNameFromUrl = (): string => {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("to") || params.get("guest") || "";
  try {
    return decodeURIComponent(raw.replace(/\+/g, " ")).trim();
  } catch {
    return raw.trim();
  }
};

export const useGuestName = (): string => {
  const [name, setName] = useState<string>(() => getGuestNameFromUrl());
  useEffect(() => {
    const onPop = () => setName(getGuestNameFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return name;
};

/** Build personalized invitation URL: https://site/?to=Nama */
export const buildInvitationUrl = (guestName: string, baseUrl?: string): string => {
  const base = baseUrl || (typeof window !== "undefined" ? `${window.location.origin}${window.location.pathname}` : "");
  const encoded = encodeURIComponent(guestName.trim());
  return `${base}?to=${encoded}`;
};
