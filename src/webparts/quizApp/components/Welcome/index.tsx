import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';
import { useQuiz } from '../../context/QuizContext';
import { ScreenTypes } from '../../types';

interface WelcomeProps {
    //onStartQuiz: () => void;
}

const Welcome: React.FC<WelcomeProps> = () => {
    const { setCurrentScreen } = useQuiz();

    const goToQuizDetailsScreen = () => {
        setCurrentScreen(ScreenTypes.UserDetails)
    }
    return (
        <div>
            <h1>Welcome to the Quiz!</h1>
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

export default Welcome;