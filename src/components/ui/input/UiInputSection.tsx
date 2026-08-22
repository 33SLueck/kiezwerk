import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Section } from '@/components/ui/section';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

export const UiInputSection = () => {
  return (
    <Section spacing="lg">
      <Container size="lg">
        <Stack gap="lg">
          <Stack gap="sm">
            <Heading level={2} size="2xl">
              Input
            </Heading>
            <Text size="sm" className="text-muted-foreground">
              Eingabefeld mit optionalem Helper Text und Fehlerzustand.
            </Text>
          </Stack>

          <Section
            as="section"
            spacing="md"
            className="rounded-xl border border-border bg-card p-6"
          >
            <Stack gap="md">
              <Heading level={3} size="lg">
                Helper Text
              </Heading>

              <Input
                label="E-Mail"
                placeholder="name@domain.de"
                helperText="Wir senden dir keine Werbung."
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

              <Input
                label="Passwort"
                type="password"
                placeholder="••••••••"
                error="Das Passwort ist zu kurz."
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

              <Input
                label="Vorname"
                placeholder="Max"
                required
                helperText="Pflichtfeld für die persönliche Ansprache."
              />
            </Stack>
          </Section>
        </Stack>
      </Container>
    </Section>
  );
};
