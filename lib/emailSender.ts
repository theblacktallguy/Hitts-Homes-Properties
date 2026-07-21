export function getResendSender() {
  const configuredSender = process.env.RESEND_FROM_EMAIL?.trim();
  const wrappedAddress = configuredSender?.match(/<([^<>\s]+@[^<>\s]+)>/)?.[1];
  const emailAddress = wrappedAddress || configuredSender;

  if (!emailAddress) {
    return "onboarding@resend.dev";
  }

  return `Hitts Homes & Properties <${emailAddress}>`;
}
