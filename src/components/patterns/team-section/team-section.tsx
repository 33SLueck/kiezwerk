import * as React from 'react';
import type { TeamSectionProps } from './team-section.types';
import {
  getTeamSectionClasses,
  getTeamSectionInnerClasses,
  getTeamGridClasses,
} from './team-section.styles';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

export const TeamSection = ({ title, subtitle, members, className }: TeamSectionProps) => {
  return (
    <section className={getTeamSectionClasses(className)}>
      <div className={getTeamSectionInnerClasses()}>
        {title || subtitle ? (
          <div className="mx-auto max-w-2xl text-center mb-16">
            {subtitle ? (
              <Text
                as="p"
                className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2"
              >
                {subtitle}
              </Text>
            ) : null}
            {title ? (
              <Heading level={2} size="xl">
                {title}
              </Heading>
            ) : null}
          </div>
        ) : null}

        <div className={getTeamGridClasses()}>
          {members.map((member, index) => (
            <Card
              key={index}
              className="flex flex-col items-center text-center p-8 hover:shadow-md transition-shadow"
            >
              <Avatar className="h-24 w-24 mb-6">
                {member.imageUrl ? <AvatarImage src={member.imageUrl} alt={member.name} /> : null}
                <AvatarFallback>{member.fallbackInitials}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-sm font-semibold text-muted-foreground mb-4">{member.role}</p>
              {member.bio ? (
                <p className="text-sm text-muted-foreground/80 line-clamp-3">{member.bio}</p>
              ) : null}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
