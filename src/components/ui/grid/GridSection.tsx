import { Container } from '@/components/ui/container';
import { Grid } from '@/components/ui/grid';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

export const UiGridSection = () => {
  return (
    <Section spacing="lg">
      <Container size="lg">
        <Stack gap="lg">
          <Stack gap="sm">
            <Heading level={2} size="2xl">
              Grid
            </Heading>
            <Text size="sm" className="text-muted-foreground">
              Responsive Layout-Primitive für Karten, Features oder andere mehrspaltige Inhalte.
            </Text>
          </Stack>

          <Section
            as="section"
            spacing="md"
            className="rounded-xl border border-border bg-card p-6"
          >
            <Stack gap="md">
              <Heading level={3} size="lg">
                Responsive Grid Demo
              </Heading>
              <Text size="sm" className="text-muted-foreground">
                Mobile 1 Spalte, ab md 2 Spalten, ab lg 3 Spalten.
              </Text>

              <Grid responsiveColumns={{ initial: 1, md: 2, lg: 3 }} gap="md">
                <div className="rounded-lg border border-border bg-background p-4">
                  <Stack gap="xs">
                    <Heading level={4} size="md">
                      Item 1
                    </Heading>
                    <Text size="sm" className="text-muted-foreground">
                      Erste Grid-Zelle.
                    </Text>
                  </Stack>
                </div>

                <div className="rounded-lg border border-border bg-background p-4">
                  <Stack gap="xs">
                    <Heading level={4} size="md">
                      Item 2
                    </Heading>
                    <Text size="sm" className="text-muted-foreground">
                      Zweite Grid-Zelle.
                    </Text>
                  </Stack>
                </div>

                <div className="rounded-lg border border-border bg-background p-4">
                  <Stack gap="xs">
                    <Heading level={4} size="md">
                      Item 3
                    </Heading>
                    <Text size="sm" className="text-muted-foreground">
                      Dritte Grid-Zelle.
                    </Text>
                  </Stack>
                </div>
              </Grid>
            </Stack>
          </Section>
        </Stack>
      </Container>
    </Section>
  );
};
