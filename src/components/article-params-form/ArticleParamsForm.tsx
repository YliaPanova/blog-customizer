import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	currentState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	const [formState, setFormState] = useState<ArticleStateType>(currentState);

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const handleToggle = () => {
		if (!isMenuOpen) {
			setFormState(currentState);
		}
		setIsMenuOpen(!isMenuOpen);
	};

	const handleFormChange = (
		field: keyof ArticleStateType,
		value: OptionType
	) => {
		setFormState((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleApply = () => {
		onApply(formState);
		setIsMenuOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset();
		setIsMenuOpen(false);
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleApply();
	};

	const handleFormReset = (e: React.FormEvent) => {
		e.preventDefault();
		handleReset();
	};

	const findOption = (options: OptionType[], value: string) => {
		return options.find((opt) => opt.value === value) || options[0];
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleToggle} />
			<aside
				ref={formRef}
				className={`${styles.container} ${
					isMenuOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text as='h2' size={31} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>

					{/* Выбор шрифта */}
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={findOption(
							fontFamilyOptions,
							formState.fontFamilyOption.value
						)}
						onChange={(selected: OptionType) =>
							handleFormChange('fontFamilyOption', selected)
						}
					/>

					{/* Размер шрифта */}
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={findOption(
							fontSizeOptions,
							formState.fontSizeOption.value
						)}
						onChange={(selected: OptionType) =>
							handleFormChange('fontSizeOption', selected)
						}
					/>

					{/* Цвет шрифта */}
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={findOption(fontColors, formState.fontColor.value)}
						onChange={(selected: OptionType) =>
							handleFormChange('fontColor', selected)
						}
					/>

					<Separator />

					{/* Цвет фона */}
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={findOption(
							backgroundColors,
							formState.backgroundColor.value
						)}
						onChange={(selected: OptionType) =>
							handleFormChange('backgroundColor', selected)
						}
					/>

					{/* Ширина контента */}
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={findOption(contentWidthArr, formState.contentWidth.value)}
						onChange={(selected: OptionType) =>
							handleFormChange('contentWidth', selected)
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
