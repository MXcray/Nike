import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { AppLink } from '@/shared/ui/AppLink/AppLink.tsx';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Shared/AppLink',
	component: AppLink,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		// backgroundColor: { control: 'color' },
	},
	args: {
		to: '/',
		onClick: fn(),
	},
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Some link',
	},
	// parameters: {
	// 	// Эмулируем hover состояние
	// 	pseudo: { hover: true },
	// 	chromatic: {
	// 		delay: 300,
	// 	},
	// },
};

export const Bold: Story = {
	args: {
		children: 'Some link',
		variant: 'bold',
	},
};

export const Underline: Story = {
	args: {
		children: 'Some link',
		variant: 'underline',
	},
};