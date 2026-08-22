'use client';

import * as React from 'react';
import type { ContactSectionProps } from './contact-section.types';
import { getContactSectionClasses, getContactSectionInnerClasses } from './contact-section.styles';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC<ContactSectionProps> = ({
  title = 'Get in touch',
  subtitle = 'Contact',
  email = 'hello@example.com',
  phone = '+1 (555) 000-0000',
  address = '123 Innovation Way, Tech Suite 456, San Francisco, CA 94107',
  className,
  isSubmitting = false,
  error,
  successMessage,
  onSubmit,
}) => {
  const [name, setName] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ name, email: contactEmail, message });
    }
  };

  return (
    <section className={getContactSectionClasses(className)}>
      <div className={getContactSectionInnerClasses()}>
        <div>
          {subtitle ? (
            <Text
              as="p"
              className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2"
            >
              {subtitle}
            </Text>
          ) : null}
          <Heading level={2} size="xl" className="mb-6">
            {title}
          </Heading>
          <p className="text-sm text-muted-foreground max-w-md mb-8">
            We are always here to help. Reach out to our customer success or developer relations
            team and we will get back to you within 24 hours.
          </p>
          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-foreground">{email}</span>
            </div>
            <div className="flex gap-4 items-center">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-foreground">{phone}</span>
            </div>
            <div className="flex gap-4 items-center">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
              <span className="text-sm text-foreground">{address}</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 border border-border rounded-lg p-6 bg-muted/10"
        >
          {error && (
            <div className="flex items-center gap-2 p-3 text-xs font-medium text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
              <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center gap-2 p-3 text-xs font-medium text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              <span>{successMessage}</span>
            </div>
          )}

          <Input
            label="Full Name"
            type="text"
            placeholder="Mara Klein"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
          <FormField label="Message" required>
            <Textarea
              placeholder="How can we help you?"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </FormField>
          <Button type="submit" fullWidth isLoading={isSubmitting} disabled={isSubmitting}>
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};
