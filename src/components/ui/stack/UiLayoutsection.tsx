import { ArrowRight, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import { Section } from '@/components/ui/section';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

export const UiLayoutSection = () => {
  return (
    <Section spacing="lg">
      <Container size="lg">
        <Stack gap="lg">
          <Stack gap="sm">
            <Heading level={2} size="2xl">
              PageSection Stack
            </Heading>
            <Text size="sm" className="text-muted-foreground">
              Erste gemeinsame Referenz für Container, Section und Stack als strukturelle Basis für
              spätere Grid-Layouts.
            </Text>
          </Stack>

          <Stack gap="lg">
            <Section
              as="section"
              spacing="md"
              className="rounded-xl border border-border bg-card p-6"
            >
              <Stack gap="sm">
                <Heading level={3} size="lg">
                  Page Section innerhalb eines Containers
                </Heading>
                <Text size="sm" className="text-muted-foreground">
                  Diese Section nutzt den Container für Breite und Padding. Section selbst steuert
                  das vertikale Spacing und bleibt semantisch sauber.
                </Text>

                <Stack direction="horizontal" gap="sm" wrap align="center">
                  <Button leadingIcon={<Icon icon={Plus} />}>Create</Button>
                  <Button variant="secondary" trailingIcon={<Icon icon={ArrowRight} />}>
                    Details
                  </Button>
                  <Link href="/components" className="inline-flex items-center gap-1">
                    Komponentenübersicht
                    <Icon icon={ArrowRight} size={16} />
                  </Link>
                </Stack>
              </Stack>
            </Section>

            <Section
              as="aside"
              spacing="md"
              className="rounded-xl border border-border bg-muted p-4"
            >
              <Stack gap="xs">
                <Heading level={4} size="md">
                  Muted Section (Aside)
                </Heading>
                <Text size="sm" className="text-muted-foreground">
                  Ergänzender Block für Hinweise, Kontext oder sekundäre Inhalte.
                </Text>
              </Stack>
            </Section>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
};
