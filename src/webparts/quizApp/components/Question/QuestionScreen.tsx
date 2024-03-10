import * as React from 'react';
import { useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { useTimer } from '../../hooks';
import { ScreenTypes } from '../../types';
import QuestionHeader from './QuestionHeader';
import Question from './Question/Question';
import { Dialog, DialogType, PrimaryButton } from '@fluentui/react';
import styles from './QuestionScreen.module.scss';


const QuestionScreen: React.FC = () => {
    const [activeQuestion, setActiveQuestion] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null | undefined>(null)
    const [showTimerModal, setShowTimerModal] = useState<boolean>(false);
    const [showResultModal, setShowResultModal] = useState<boolean>(false);
    //const [hideDialog, setHideDialog] = useState<boolean>(true);

    const {
        questions,
        quizDetails,
        result,
        setResult,
        setCurrentScreen,
        timer,
        setTimer,
        setEndTime,
    } = useQuiz();

    const currentQuestion = questions[activeQuestion];
    const { question, type, choices, code, image, correctAnswers } = currentQuestion;

    const onClickNext = () => {
        const isMatch: boolean =
            selectedAnswer.length === correctAnswers.length &&
            selectedAnswer.every((answer) => correctAnswers.includes(answer));

        // adding selected answer, and if answer matches key to result array with current question
        setResult([...result, { ...currentQuestion, selectedAnswer, isMatch }])

        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1)
        } else {
            // how long does it take to finish the quiz
            const timeTaken = quizDetails.totalTime - timer
            setEndTime(timeTaken);
            setShowResultModal(true);
        }
        //setHideDialog(false);
        setSelectedAnswer([]);
        setSelectedAnswerIndex(null);
    };

    const handleAnswerSelection = (e: React.ChangeEvent<HTMLInputElement>, index: number | null | undefined) => {
        const { name, checked } = e.target;
        console.log('name', showResultModal);
        console.log(showTimerModal)
        setSelectedAnswerIndex(index);
        if (type === 'MAQs') {
            if (selectedAnswer.includes(name)) {

                setSelectedAnswer((prevSelectedAnswer) =>
                    prevSelectedAnswer.filter((element) => element !== name)
                )
            } else {
                setSelectedAnswer((prevSelectedAnswer) => [...prevSelectedAnswer, name])
            }
        }

        if (type === 'MCQs' || type === 'boolean') {
            if (checked) {
                setSelectedAnswer([name])
            }
        }
    };

    const handleModal = () => {
        setCurrentScreen(ScreenTypes.ResultScreen)
        document.body.style.overflow = 'auto'
    };

    // to prevent scrolling when modal is opened
    // useEffect(() => {
    //     if (showTimerModal || showResultModal) {
    //         document.body.style.overflow = 'hidden'
    //     }
    // }, [showTimerModal, showResultModal]);

    // timer hooks, handle conditions related to time
    useTimer(timer, quizDetails, setEndTime, setTimer, setShowTimerModal, showResultModal);

    return (
        <div className='quiz-container'>
            <div>
                <QuestionHeader
                    activeQuestion={activeQuestion}
                    totalQuestions={quizDetails.totalQuestions}
                    timer={timer}
                />
                <Question question={question} code={code}
                    image={image}
                    choices={choices}
                    type={type}
                    handleAnswerSelection={handleAnswerSelection}
                    selectedAnswer={selectedAnswer} selectedAnswerIndex={selectedAnswerIndex} />
                <div className={styles.toolbox}>
                    <PrimaryButton text={activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                        onClick={onClickNext} disabled={selectedAnswer.length === 0}>Next</PrimaryButton>
                </div>
            </div>

            {(showTimerModal || showResultModal) &&
                (
                    <Dialog
                        hidden={false}
                        dialogContentProps={{
                            type: DialogType.normal,
                            title: showResultModal ? 'Done!' : 'Your time is up!',
                            subText: `You have attempted ${result.length} questions in total.`
                        }}
                    >
                        <PrimaryButton text="Close" onClick={handleModal} />
                    </Dialog>
                )}

        </div>
    );
};

export default QuestionScreen;