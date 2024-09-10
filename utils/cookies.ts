"use client"

import { generateKey, encrypt, decrypt } from '@/utils/crypto-web'

export function setCookie(name: string, value: string, expireInSeconds: number) {
  let expires = "";
  let date = new Date();
  date.setTime(date.getTime() + (expireInSeconds * 1000));
  expires = "; expires=" + date.toUTCString();

  document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  if (!typeof document) return null;

  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();

    if (cookie.startsWith(nameEQ)) {
      return cookie.substring(nameEQ.length);
    }
  }

  return null;
}

export function eraseCookie(name: string) {
  document.cookie = name +'=; Path=/; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}