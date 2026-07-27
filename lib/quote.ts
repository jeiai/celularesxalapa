import { devices, plans } from "@/lib/data";

export type QuoteInput = {
  deviceSlug: string;
  planId?: string;
  downPayment: number;
  months: number;
};

export function calculateQuote(input: QuoteInput) {
  const device = devices.find((item) => item.slug === input.deviceSlug) ?? devices[0];
  const plan = plans.find((item) => item.id === input.planId);
  const financed = Math.max(device.price - input.downPayment, 0);
  const financingFee = Math.ceil(financed * 0.08);
  const deviceMonthly = Math.ceil((financed + financingFee) / input.months);
  const monthlyPay = deviceMonthly + (plan?.monthlyFee ?? 0);
  const total = input.downPayment + monthlyPay * input.months;

  return {
    device,
    plan,
    months: input.months,
    downPayment: input.downPayment,
    monthlyPay,
    total,
    summary: `${device.model} a ${input.months} meses${plan ? ` con ${plan.name}` : ""}`
  };
}
