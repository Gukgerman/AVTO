export interface BookingPayload {
  name: string;
  phone: string;
  date: string;
}

/**
 * Stub submit handler — wire this up to email / CRM / Telegram bot later.
 * Kept isolated from the form UI so the integration can change without
 * touching validation or markup.
 */
export async function submitBooking(payload: BookingPayload): Promise<{ ok: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  // eslint-disable-next-line no-console
  console.log("Booking submitted (no backend wired yet):", payload);
  return { ok: true };
}
