import { memo, useMemo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './Pagination.module.scss';
import arrowIcon from '@/shared/assets/icons/paginate-arrow.svg?react';
import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts';
import { Icon } from '@/shared/ui/Icon/Icon.tsx';

interface PaginationProps {
	/**
	 * Общее количество элементов
	 */
	totalItems: number;

	/**
	 * Количество элементов на странице
	 */
	itemsPerPage: number;

	/**
	 * Текущая страница (начиная с 1)
	 */
	currentPage: number;

	/**
	 * Функция обработчик изменения страницы
	 */
	onPageChange: (page: number) => void;
	/**
	 * Состояние запроса
	 * */
	isLoading?: boolean;

	/**
	 * Показывать ли последнюю страницу в пагинации
	 * @default true
	 */
	showLastPage?: boolean;

	/**
	 * Максимальное количество отображаемых страниц (не включая первую и последнюю)
	 * @default 5
	 */
	maxVisiblePages?: number;

	/**
	 * Текст для кнопки "Назад"
	 * @default "Назад"
	 */
	prevLabel?: string;

	/**
	 * Текст для кнопки "Далее"
	 * @default "Далее"
	 */
	nextLabel?: string;

	/**
	 * CSS класс для контейнера пагинации
	 */
	className?: string;
}

export const Pagination = memo((props: PaginationProps) => {
	const {
		totalItems,
		itemsPerPage,
		currentPage,
		onPageChange,
		isLoading,
		showLastPage = true,
		maxVisiblePages = 5,
		prevLabel = 'Назад',
		nextLabel = 'Далее',
		className,
	} = props;


	const totalPages = useMemo(() => {
		return Math.max(1, Math.ceil(totalItems / itemsPerPage));
	}, [totalItems, itemsPerPage]);

	// Определяем диапазон отображаемых страниц
	const pageRange = useMemo(() => {
		// Если страниц меньше или равно максимальному количеству отображаемых,
		// показываем все страницы
		if (totalPages <= maxVisiblePages) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		// Если нужно показывать последнюю страницу
		if (showLastPage) {
			// Определяем, сколько страниц показывать до многоточия
			const pagesBeforeEllipsis = maxVisiblePages - 1;

			// Если текущая страница близка к началу
			if (currentPage <= pagesBeforeEllipsis) {
				return [
					...Array.from({ length: pagesBeforeEllipsis }, (_, i) => i + 1),
					'...',
					totalPages
				];
			}

			// Если текущая страница близка к концу
			if (currentPage > totalPages - pagesBeforeEllipsis) {
				return [
					1,
					'...',
					...Array.from(
						{ length: pagesBeforeEllipsis },
						(_, i) => totalPages - pagesBeforeEllipsis + i + 1
					)
				];
			}

			// Если текущая страница где-то в середине
			const pagesAroundCurrent = Math.floor((pagesBeforeEllipsis - 2) / 2);
			return [
				1,
				'...',
				...Array.from(
					{ length: pagesBeforeEllipsis - 2 },
					(_, i) => currentPage - pagesAroundCurrent + i
				),
				'...',
				totalPages
			];
		}
		// Если не нужно показывать последнюю страницу, используем скользящее окно
		else {
			// Определяем начальную страницу для отображения
			let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));

			// Корректируем начальную страницу, если достигли конца
			if (startPage + maxVisiblePages > totalPages) {
				startPage = Math.max(1, totalPages - maxVisiblePages + 1);
			}

			return Array.from(
				{ length: Math.min(maxVisiblePages, totalPages) },
				(_, i) => startPage + i
			);
		}
	}, [totalPages, currentPage, maxVisiblePages, showLastPage]);

	// Обработчики для кнопок
	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	const handlePageClick = (page: number | string) => {
		if (typeof page === 'number' && page !== currentPage) {
			onPageChange(page);
		}
	};

	// Если всего одна страница, не показываем пагинацию
	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className={classNames(cls.Pagination, {}, [className])}>
			{/* Кнопка "Назад" */}
			<button
				className={classNames('', {}, [
					cls.paginationButton,
					cls.paginationPrev,
				])}
				onClick={handlePrevious}
				disabled={currentPage === 1 || isLoading}
				aria-label="Предыдущая страница"
			>
				<Icon className={cls.buttonIcon} Svg={arrowIcon} />
				{prevLabel && <span>{prevLabel}</span>}
			</button>

			{/* Страницы */}
			<div className={cls.pages}>
				{pageRange.map((page, index) =>
					typeof page === 'number' ? (
						<button
							key={index}
							className={classNames(cls.page, {
								[cls.pageActive]: currentPage === page,
							})}
							onClick={() => handlePageClick(page)}
							disabled={isLoading}
							aria-label={`Страница ${page}`}
							aria-current={currentPage === page ? 'page' : undefined}
						>
							{page}
						</button>
					) : (
						<span key={index} className={cls.ellipsis} aria-hidden="true">
							{page}
						</span>
					),
				)}
			</div>

			{/* Кнопка "Далее" */}
			<button
				className={classNames('', {}, [
					cls.paginationButton,
					cls.paginationNext,
				])}
				onClick={handleNext}
				disabled={currentPage === totalPages || isLoading}
				aria-label="Следующая страница"
			>
				{nextLabel && <span>{nextLabel}</span>}
				<Icon className={cls.buttonIcon} Svg={arrowIcon} />
			</button>
		</div>
	);
});