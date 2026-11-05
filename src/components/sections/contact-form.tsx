"use client";

import { Send } from "lucide-react";
import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
  validateContactField,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact-validation";

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-base transition-colors duration-200 placeholder:text-muted-foreground hover:border-muted-foreground focus:border-accent focus:outline-none aria-invalid:border-destructive aria-invalid:focus:border-destructive";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-destructive">
      {message}
    </p>
  );
}

/** The site has no backend, so the form hands off a pre-filled draft to the visitor's email app. */
export function ContactForm({ email }: { email: string }) {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [opened, setOpened] = useState(false);

  function setFieldError(field: ContactField, value: string) {
    setErrors((current) => ({ ...current, [field]: validateContactField(field, value) }));
  }

  function handleBlur({ target }: FocusEvent<FieldElement>) {
    setFieldError(target.name as ContactField, target.value);
  }

  // Errors clear as soon as the visitor fixes them, but don't appear while they're still typing.
  function handleChange({ target }: ChangeEvent<FieldElement>) {
    setOpened(false);
    const field = target.name as ContactField;
    if (errors[field]) setFieldError(field, target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name")).trim();
    const message = String(data.get("message")).trim();

    const nextErrors: ContactErrors = {
      name: validateContactField("name", name),
      message: validateContactField("message", message),
    };
    setErrors(nextErrors);

    const firstInvalid = nextErrors.name ? "name" : nextErrors.message ? "message" : null;
    if (firstInvalid) {
      form.querySelector<FieldElement>(`[name="${firstInvalid}"]`)?.focus();
      setOpened(false);
      return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setOpened(true);
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-border bg-card p-6 md:p-8"
    >
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
          Your name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          maxLength={NAME_MAX_LENGTH}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          className={fieldClass}
        />
        <FieldError id="contact-name-error" message={errors.name} />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={MESSAGE_MAX_LENGTH}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          className={fieldClass}
        />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit">
          <Send />
          Write email
        </Button>
        <p role="status" className="text-sm text-muted-foreground">
          {opened && "Your email app should open with this message. Press send there to deliver it."}
        </p>
      </div>
    </form>
  );
}
