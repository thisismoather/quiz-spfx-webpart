import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';
import { useQuiz } from '../../context/QuizContext';
import { ScreenTypes } from '../../../../shared/types';
import styles from './Welcome.module.scss';

interface WelcomeProps {
    //onStartQuiz: () => void;
}

const WelcomeScreen: React.FC<WelcomeProps> = () => {
    const { setCurrentScreen } = useQuiz();

    const goToQuizDetailsScreen = () => {
        setCurrentScreen(ScreenTypes.UserDetails)
    }
    return (
        <div className={styles.container}>
            <h2>Welcome to the Quiz!</h2>
            <section>
                <p>Here are the instructions for the quiz:</p>
                <ul>
                    <li>Read each question carefully.</li>
                    <li>Select the correct answer.</li>
                    <li>Click the "Submit" button to submit your answers.</li>
                </ul>
            </section>

            <PrimaryButton onClick={goToQuizDetailsScreen} >Start Quiz</PrimaryButton>
        </div>
    );
};

export default WelcomeScreen;