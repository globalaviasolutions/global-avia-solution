"use client";

export default function PrintCapabilityButton() {
  return (
    <button className="button primary capabilityPrintButton" type="button" onClick={() => window.print()}>
      Save or print as PDF
    </button>
  );
}
