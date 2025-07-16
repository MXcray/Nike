import type { Meta, StoryObj } from '@storybook/react-vite';
import { MainPage } from './MainPage';

const meta = {
	title: 'Pages/MainPage',
	component: MainPage,
	tags: ['autodocs'],
	args: {},
} satisfies Meta<typeof MainPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};