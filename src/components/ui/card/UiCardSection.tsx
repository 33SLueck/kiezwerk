import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

export const UiCardSection = () => {
  return (
    <Section spacing="lg">
      <Container size="lg">
        <Stack gap="lg">
          <Stack gap="sm">
            <Heading level={2} size="2xl">
              Card
            </Heading>
            <Text size="sm" className="text-muted-foreground">
              Grundlegender Container für zusammengehörige Inhalte und Aktionen.
            </Text>
          </Stack>

          <Section
            as="section"
            spacing="md"
            className="rounded-xl border border-border bg-card p-6"
          >
            <Stack gap="md">
              <Heading level={3} size="lg">
                Simple Content Card
              </Heading>

              <Card>
                <Stack gap="md">
                  <Stack gap="xs">
                    <Badge variant="secondary">Feature</Badge>
                    <Heading level={4} size="md">
                      Card Title
                    </Heading>
                    <Text size="sm" className="text-muted-foreground">
                      Kurzer Beschreibungstext für einen klaren, konzentrierten Inhaltsblock. Die
                      Card bündelt zusammengehörige Informationen.
                    </Text>
                  </Stack>

                  <div className="flex flex-wrap gap-3">
                    <Button>Primary action</Button>
                    <Button variant="secondary">Secondary action</Button>
                  </div>
                </Stack>
              </Card>
            </Stack>
          </Section>

          <Section
            as="section"
            spacing="md"
            className="rounded-xl border border-border bg-card p-6"
          >
            <Stack gap="md">
              <Heading level={3} size="lg">
                Outline Variant
              </Heading>

              <Card variant="outline" padding="lg">
                <Stack gap="sm">
                  <Heading level={4} size="md">
                    Outline Card
                  </Heading>
                  <Text size="sm" className="text-muted-foreground">
                    Gleiche Struktur, aber mit einer dezenteren Oberflächendarstellung.
                  </Text>
                </Stack>
              </Card>
            </Stack>
          </Section>
        </Stack>
      </Container>
    </Section>
  );
};
