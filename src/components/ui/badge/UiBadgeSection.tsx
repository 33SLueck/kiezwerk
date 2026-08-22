import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

export const UiBadgeSection = () => {
  return (
    <Section spacing="lg">
      <Container size="lg">
        <Stack gap="lg">
          <Stack gap="sm">
            <Heading level={2} size="2xl">
              Badge
            </Heading>
            <Text size="sm" className="text-muted-foreground">
              Kurze Labels für Status, Kategorien oder kleine Hinweise.
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
                Die Badge ist klein, nicht interaktiv und für kurze Zustände gedacht.
              </Text>

              <Stack direction="horizontal" gap="sm" wrap align="center">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="destructive">Destructive</Badge>
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
                Typische Labels
              </Heading>

              <Stack direction="horizontal" gap="sm" wrap align="center">
                <Badge>New</Badge>
                <Badge variant="secondary">Beta</Badge>
                <Badge variant="success">Active</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="destructive">Error</Badge>
              </Stack>
            </Stack>
          </Section>
        </Stack>
      </Container>
    </Section>
  );
};
