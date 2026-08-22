import { Alert } from '@/components/ui/alert';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

export const UiAlertSection = () => {
  return (
    <Section spacing="lg">
      <Container size="lg">
        <Stack gap="lg">
          <Stack gap="sm">
            <Heading level={2} size="2xl">
              Alert
            </Heading>
            <Text size="sm" className="text-muted-foreground">
              Kurze Hinweise für Status, Warnungen oder wichtige Feedback-Meldungen.
            </Text>
          </Stack>

          <Section
            as="section"
            spacing="md"
            className="rounded-xl border border-border bg-card p-6"
          >
            <Stack gap="md">
              <Heading level={3} size="lg">
                Varianten
              </Heading>
              <Text size="sm" className="text-muted-foreground">
                Alerts sollen Aufmerksamkeit erzeugen, aber den Nutzerfluss nicht unterbrechen.
              </Text>

              <Stack gap="sm">
                <Alert
                  variant="default"
                  title="Hinweis"
                  description="Dies ist eine neutrale Informationsmeldung."
                />
                <Alert
                  variant="success"
                  title="Gespeichert"
                  description="Deine Änderungen wurden erfolgreich übernommen."
                />
                <Alert
                  variant="warning"
                  title="Achtung"
                  description="Bitte prüfe deine Eingabe noch einmal."
                />
                <Alert
                  variant="destructive"
                  title="Fehler"
                  description="Beim Speichern ist etwas schiefgelaufen."
                />
                <Alert
                  variant="info"
                  title="Info"
                  description="Zusätzliche Informationen für den aktuellen Kontext."
                />
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
                Mit Icon und längerer Beschreibung
              </Heading>

              <Alert
                variant="warning"
                title="Wichtiger Hinweis"
                description="Diese Variante zeigt, wie sich Titel, Beschreibung und Icon in einem kompakten Feedback-Block kombinieren lassen."
              />
            </Stack>
          </Section>
        </Stack>
      </Container>
    </Section>
  );
};
