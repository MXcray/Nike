import { useMediaQuery } from 'react-responsive';

export const useAppMedia = () => {
	const isMedia1360 = useMediaQuery({
		query: '(min-width: 1360px)'
	});

	const isMedia992 = useMediaQuery({
		query: '(min-width: 992px)'
	});

	const isMedia768 = useMediaQuery({
		query: '(min-width: 768px)'
	});

	const isMedia480 = useMediaQuery({
		query: '(min-width: 480px)'
	});

	const isMedia360 = useMediaQuery({
		query: '(min-width: 360px)'
	});

	return {
		isMedia1360,
		isMedia992,
		isMedia768,
		isMedia480,
		isMedia360,
	}
}