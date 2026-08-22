import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { Select } from '@/components/ui/select';

export const UiSelectSection = () => {
  return (
    <Section spacing="lg">
      <Container size="lg">
        <Stack gap="lg">
          <Stack gap="sm">
            <Heading level={2} size="2xl">
              Select
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
              <Select
                label="Land"
                placeholder="Bitte auswählen"
                options={[
                  { value: 'de', label: 'Deutschland' },
                  { value: 'at', label: 'Österreich' },
                  { value: 'ch', label: 'Schweiz' },
                ]}
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
                Helper Text
              </Heading>
              <Select
                label="Anrede"
                helperText="Wird für die persönliche Ansprache verwendet."
                placeholder="Bitte auswählen"
                options={[
                  { value: 'f', label: 'Frau' },
                  { value: 'm', label: 'Herr' },
                  { value: 'd', label: 'Divers' },
                ]}
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
              <Select
                label="Region"
                helperText="Bitte wähle eine gültige Region aus."
                error
                placeholder="Bitte auswählen"
                options={[
                  { value: 'eu', label: 'Europa' },
                  { value: 'na', label: 'Nordamerika' },
                  { value: 'apac', label: 'APAC' },
                ]}
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
              <Select
                label="Status"
                helperText="Diese Auswahl ist momentan deaktiviert."
                disabled
                placeholder="Nicht verfügbar"
                options={[
                  { value: 'a', label: 'Option A' },
                  { value: 'b', label: 'Option B' },
                ]}
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
                Required Field
              </Heading>
              <Select
                label="Sprache"
                required
                helperText="Pflichtfeld für die gewünschte Lokalisierung."
                placeholder="Bitte auswählen"
                options={[
                  { value: 'de', label: 'Deutsch' },
                  { value: 'en', label: 'Englisch' },
                  { value: 'fr', label: 'Französisch' },
                ]}
              />
            </Stack>
          </Section>
        </Stack>
      </Container>
    </Section>
  );
};
