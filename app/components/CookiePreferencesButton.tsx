"use client";

export default function CookiePreferencesButton() {
  return (
    <button
      type="button"
      className="cookiePreferencesButton"
      onClick={() => window.dispatchEvent(new Event("open-cookie-preferences"))}
    >
      Cookie preferences
    </button>
  );
}
