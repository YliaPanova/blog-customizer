import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

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
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	const [formState, setFormState] = useState<ArticleStateType>(currentState);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				formRef.current &&
				!formRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleToggle = () => {
		if (!isOpen) {
			setFormState(currentState);
		}
		setIsOpen(!isOpen);
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
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
		setIsOpen(false);
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
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				ref={formRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
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

					<Separator />

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

					<Separator />

					<RadioGroup
						title='Цвет шрифта'
						name='fontColor'
						options={fontColors}
						selected={findOption(fontColors, formState.fontColor.value)}
						onChange={(selected: OptionType) =>
							handleFormChange('fontColor', selected)
						}
					/>

					<Separator />

					<RadioGroup
						title='Цвет фона'
						name='backgroundColor'
						options={backgroundColors}
						selected={findOption(
							backgroundColors,
							formState.backgroundColor.value
						)}
						onChange={(selected: OptionType) =>
							handleFormChange('backgroundColor', selected)
						}
					/>

					<Separator />

					<RadioGroup
						title='Ширина контента'
						name='contentWidth'
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
