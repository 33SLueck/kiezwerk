import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TestimonialsSection } from './testimonials-section';

const meta = {
  title: 'Patterns/TestimonialsSection',
  component: TestimonialsSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TestimonialsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: 'Testimonials',
    title: 'What teams say after shipping with the system',
    description:
      'Short, credible quotes work best when they answer the question: would this work for someone like me?',
    items: [
      {
        quote: 'We shipped the landing page in a fraction of the time and kept the UI consistent.',
        name: 'Mara Klein',
        role: 'Product Designer',
        company: 'Northstar',
        avatar: (
          <Avatar className="h-11 w-11">
            <AvatarImage
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop"
              alt="Mara Klein"
            />
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
        ),
        rating: 5,
      },
      {
        quote:
          'The structure made it much easier for our team to extend pages without design drift.',
        name: 'Jonas Weber',
        role: 'Frontend Lead',
        company: 'Studio One',
        avatar: (
          <Avatar className="h-11 w-11">
            <AvatarFallback>JW</AvatarFallback>
          </Avatar>
        ),
        rating: 5,
      },
      {
        quote: 'Having everything documented in Storybook removed a lot of back-and-forth.',
        name: 'Lea Brandt',
        role: 'Design Engineer',
        company: 'Bright Labs',
        avatar: (
          <Avatar className="h-11 w-11">
            <AvatarFallback>LB</AvatarFallback>
          </Avatar>
        ),
        rating: 5,
      },
    ],
  },
};
