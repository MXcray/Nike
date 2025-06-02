import { memo } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './SizesTableModal.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal.tsx';

interface SizesTableModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const SizesTableModal = memo((props: SizesTableModalProps) => {
	const {
		className,
		isOpen,
		onClose,
	} = props;

	const sizeData = {
		footLength: ['22,5', '23,5', '24,5', '25', '25,5', '26', '26,5', '27,5', '28', '29', '29,5'],
		eu: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46'],
		rus: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
		us: ['5,5', '6', '6,5', '7,5', '8', '8,5', '9', '10', '10,5', '11,5', '12']
	};

	return (
			<Modal
				className={classNames(cls.SizesTableModal, {}, [className])}
				isOpen={isOpen}
				onClose={onClose}
			>
				<h3 className={cls.title}>Размерная таблица</h3>
				<div className={cls.info}>
					<p>
						Вам понадобится сделать измерения с помощью линейки или сантиметровой ленты.
						Для определения нужного размера необходимо соотнести полученную длину с размерами в таблице.
					</p>
					<br/>
					<p>
						Поставьте ногу на чистый лист бумаги.
						Отметьте крайние границы ступни и измерьте расстояние между самыми дальними точками стопы.
					</p>
					<br/>
					<p>
						Округление производится в большую сторону.
						Например если у вас получился результат 27,7 см,
						то его нужно округлить до длины которая есть в таблице - в данном случае до 28 см.
					</p>
				</div>
				<div className={cls.tableInfo}>
					<h5 className={cls.tableTitle}>Таблица соответствия размеров</h5>
					<table className={cls.table}>
						{/*<thead>*/}
						{/*<tr>*/}
						{/*	<th>Длина ноги, см</th>*/}
						{/*	{sizeData.footLength.map((size, index) => (*/}
						{/*		<th key={index}>{size}</th>*/}
						{/*	))}*/}
						{/*</tr>*/}
						{/*</thead>*/}
						<tbody>
						<tr>
							<td>Длина ноги, см</td>
								{sizeData.footLength.map((size, index) => (
									<td key={index}>{size}</td>
								))}
						</tr>
						<tr>
							<td>EU</td>
							{sizeData.eu.map((size, index) => (
								<td key={index}>{size}</td>
							))}
						</tr>
						<tr>
							<td>RUS</td>
							{sizeData.rus.map((size, index) => (
								<td key={index}>{size}</td>
							))}
						</tr>
						<tr>
							<td>US</td>
							{sizeData.us.map((size, index) => (
								<td key={index}>{size}</td>
							))}
						</tr>
						</tbody>
					</table>
				</div>
			</Modal>
	);
});