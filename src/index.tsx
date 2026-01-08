import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from 'react';

import { App } from './App';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const Root = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApply = (newState: ArticleStateType) => {
		setArticleState(newState);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<App
			articleState={articleState}
			onApply={handleApply}
			onReset={handleReset}
		/>
	);
};

root.render(
	<StrictMode>
		<Root />
	</StrictMode>
);
