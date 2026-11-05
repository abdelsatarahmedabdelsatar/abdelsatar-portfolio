export const CONTACT_FIELDS = ["name", "email", "message"] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const NAME_MAX_LENGTH = 100;
export const EMAIL_MAX_LENGTH = 254;
export const MESSAGE_MAX_LENGTH = 2000;

const NAME_MIN_LENGTH = 2;
const MESSAGE_MIN_LENGTH = 10;

/** Returns an error message, or `undefined` when the value is valid. */
export function validateContactField(field: ContactField, rawValue: string) {
  const value = rawValue.trim();

  if (field === "name") {
    if (!value) return "Please enter your name.";
    if (value.length < NAME_MIN_LENGTH) return `Name must be at least ${NAME_MIN_LENGTH} characters.`;
    if (value.length > NAME_MAX_LENGTH) return `Name must be at most ${NAME_MAX_LENGTH} characters.`;
    // \p{L} accepts letters from any alphabet, so Arabic names pass.
    if (!/\p{L}/u.test(value)) return "Name must include letters.";
    return undefined;
  }

  if (field === "email") {
    if (!value) return "Please enter your email address.";
    if (value.length > EMAIL_MAX_LENGTH || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address.";
    }
    return undefined;
  }

  if (!value) return "Please enter a message.";
  if (value.length < MESSAGE_MIN_LENGTH) {
    return `Message must be at least ${MESSAGE_MIN_LENGTH} characters.`;
  }
  if (value.length > MESSAGE_MAX_LENGTH) {
    return `Message must be at most ${MESSAGE_MAX_LENGTH} characters.`;
  }
  return undefined;
}

export function validateContactForm(values: ContactValues) {
  const errors: ContactErrors = {};
  for (const field of CONTACT_FIELDS) {
    const error = validateContactField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}
