import { Decorator } from '@storybook/react';
import { StoreProvider } from '@/app/providers/StoreProvider/ui/StoreProvider';
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts';

export const StoreDecorator = (
	state?: DeepPartial<StateSchema>,
): Decorator => (Story, context) => {
	return (
		<StoreProvider
			initialState={state}
		>
			<Story {...context} />
		</StoreProvider>
	);
};

export const DefaultStoreDecorator: Decorator = StoreDecorator({});