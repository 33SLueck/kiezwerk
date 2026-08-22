import { Container } from '@/components/ui/container';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

export const UiDividerSection = () => {
  return (
    <Section spacing="lg">
      <Container size="lg">
        <Stack gap="lg">
          <Stack gap="sm">
            <Heading level={2} size="2xl">
              Divider
            </Heading>
            <Text size="sm" className="text-muted-foreground">
              Visuelles Trennelement für Abschnitte, Gruppen und ruhige Strukturierung im Layout.
            </Text>
          </Stack>

          <Section
            as="section"
            spacing="md"
            className="rounded-xl border border-border bg-card p-6"
          >
            <Stack gap="md">
              <Heading level={3} size="lg">
                Horizontale Trennung
              </Heading>

              <Stack gap="sm">
                <Text size="sm">
                  Oberer Inhalt, der durch einen Divider vom unteren Block getrennt wird.
                </Text>
                <Divider />
                <Text size="sm" className="text-muted-foreground">
                  Unterer Inhalt nach der Trennlinie.
                </Text>
              </Stack>
            </Stack>
          </Section>

          <Section
            as="section"
            spacing="md"
            className="rounded-xl border border-border bg-card p-6"
          >
            <Stack gap="md">
              <Heading level={3} size="lg">
                Muted Variante
              </Heading>

              <Stack gap="sm">
                <Text size="sm">Divider mit dezenterer Farbe für ruhigere Abgrenzungen.</Text>
                <Divider tone="muted" />
                <Text size="sm" className="text-muted-foreground">
                  Gleicher Aufbau, aber visuell zurückhaltender.
                </Text>
              </Stack>
            </Stack>
          </Section>

          <Section
            as="section"
            spacing="md"
            className="rounded-xl border border-border bg-card p-6"
          >
            <Stack gap="md">
              <Heading level={3} size="lg">
                Vertikale Trennung
              </Heading>

              <div className="flex items-center gap-4">
                <Text size="sm">Links</Text>
                <Divider as="div" orientation="vertical" className="h-6" />
                <Text size="sm">Rechts</Text>
              </div>
            </Stack>
          </Section>
        </Stack>
      </Container>
    </Section>
  );
};
