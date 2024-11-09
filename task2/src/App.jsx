import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	const steps = data;
	const [activeIndex, setActiveIndex] = useState(0);
	const [isFirstStep, setIsFirstStep] = useState(true);
	const [isLastStep, setIsLastStep] = useState(false);

	const showNextStep = () => {
		setActiveIndex(activeIndex + 1);
		setIsFirstStep(false);
		if (activeIndex + 1 === steps.length - 1) {
			setIsLastStep(true);
		} else {
			setIsLastStep(false);
		}
	};

	const showPreviousStep = () => {
		setActiveIndex(activeIndex - 1);
		setIsLastStep(false);
		if (activeIndex - 1 === 0) {
			setIsFirstStep(true);
		} else {
			setIsFirstStep(false);
		}
	};

	const returnToStartingStep = () => {
		setActiveIndex(0);
		setIsFirstStep(true);
		setIsLastStep(false);
	};

	const buttonToNext = (
		<button className={styles.button} onClick={showNextStep}>
			Далее
		</button>
	);

	const buttonToFirst = (
		<button className={styles.button} onClick={returnToStartingStep}>
			Начать сначала
		</button>
	);

	const showDefiniteStep = (event) => {
		const { target } = event;
		const index = Number(target.id);
		setActiveIndex(index);
		if (index === 0) {
			setIsFirstStep(true);
		} else {
			setIsFirstStep(false);
		}
		if (index === steps.length - 1) {
			setIsLastStep(true);
		} else {
			setIsLastStep(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((item, index) => {
							return (
								<li
									className={
										index <= activeIndex
											? styles['steps-item'] +
												' ' +
												(index === activeIndex
													? styles.active + ' ' + styles.done
													: styles.done)
											: styles['steps-item']
									}
									key={item.id}
								>
									<button
										className={styles['steps-item-button']}
										id={index}
										onClick={showDefiniteStep}
									>
										{index + 1}
									</button>
									Шаг {index + 1}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={showPreviousStep}
							disabled={isFirstStep}
						>
							Назад
						</button>
						{isLastStep ? buttonToFirst : buttonToNext}
					</div>
				</div>
			</div>
		</div>
	);
};
