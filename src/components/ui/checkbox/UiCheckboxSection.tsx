'use client';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

export const UiCheckboxSection = () => {
  const [controlledChecked, setControlledChecked] = useState(true);

  return (
    <Section spacing="lg">
      <Container size="lg">
        <Stack gap="lg">
          <Stack gap="sm">
            <Heading level={2} size="2xl">
              Checkbox
            </Heading>
            <Text size="sm" className="text-muted-foreground">
              Auswahlfeld mit Label, Helper Text, Fehlerzustand und Required-Use-Case.
            </Text>
          </Stack>

          <Section
            as="section"
            spacing="md"
            className="rounded-xl border border-border bg-card p-6"
          >
            <Stack gap="md">
              <Heading level={3} size="lg">
                Default
              </Heading>
              <Checkbox label="Ich akzeptiere die Nutzungsbedingungen" />
            </Stack>
          </Section>

          <Section
            as="section"
            spacing="md"
            className="rounded-xl border border-border bg-card p-6"
          >
            <Stack gap="md">
              <Heading level={3} size="lg">
                Helper Text
              </Heading>
              <Checkbox
                label="Newsletter abonnieren"
                helperText="Wir senden dir nur relevante Updates."
              />
            </Stack>
          </Section>

          <Section
            as="section"
            spacing="md"
            className="rounded-xl border border-border bg-card p-6"
          >
            <Stack gap="md">
              <Heading level={3} size="lg">
                Error State
              </Heading>
              <Checkbox
                label="Datenschutz akzeptieren"
                helperText="Dieses Feld ist erforderlich."
                error
              />
            </Stack>
          </Section>

          <Section
            as="section"
            spacing="md"
            className="rounded-xl border border-border bg-card p-6"
          >
            <Stack gap="md">
              <Heading level={3} size="lg">
                Disabled State
              </Heading>
              <Checkbox
                label="Option nicht verfügbar"
                helperText="Diese Auswahl ist momentan deaktiviert."
                disabled
              />
            </Stack>
          </Section>

          <Section
            as="section"
            spacing="md"
            className="rounded-xl border border-border bg-card p-6"
          >
            <Stack gap="md">
              <Heading level={3} size="lg">
                Controlled State
              </Heading>
              <Checkbox
                label="Marketing-E-Mails erhalten"
                helperText="Kann jederzeit in den Einstellungen geändert werden."
                checked={controlledChecked}
                onChange={(e) => setControlledChecked(e.target.checked)}
              />
            </Stack>
          </Section>
        </Stack>
      </Container>
    </Section>
  );
};
