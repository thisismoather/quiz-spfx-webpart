import * as React from 'react';
import styles from './ResultScreen.module.scss';
import { useQuiz } from '../../context/QuizContext';

const ResultScreen: React.FC = () => {
    const { result, questions } = useQuiz();
    const correctAnswers = result.filter(answer => answer.isMatch).length;
    const wrongAnswers = result.length - correctAnswers;
    const totalScore = result.reduce((sum, answer) => answer.isMatch ? sum + answer.score : sum, 0);
    return (
        <div className={styles.result}>
            <h3>Results</h3>
            <p>
                Total Question: <span>{questions.length}</span>
            </p>
            <p>
                Total Score:<span> {totalScore} </span>
            </p>
            <p>
                Correct Answers:<span> {correctAnswers}</span>
            </p>
            <p>
                Wrong Answers:<span> {wrongAnswers}</span>
            </p>
        </div>
    );
};

export default ResultScreen;