import * as React from 'react';
import { useEffect, useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { useTimer } from '../../hooks';
//import { ScreenTypes } from '../../types';
import QuestionHeader from './QuestionHeader';
import Question from './Question/Question';


const QuestionScreen: React.FC = () => {
    const [activeQuestion, setActiveQuestion] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);
    const [showTimerModal, setShowTimerModal] = useState<boolean>(false);
    const [showResultModal, setShowResultModal] = useState<boolean>(false);

    const {
        questions,
        quizDetails,
        result,
        setResult,
        //setCurrentScreen,
        timer,
        setTimer,
        setEndTime,
    } = useQuiz();

    const currentQuestion = questions[activeQuestion];
    const { question, type, choices, code, image, correctAnswers } = currentQuestion;
    //const { type, correctAnswers } = currentQuestion;

    const onClickNext = () => {
        const isMatch: boolean =
            selectedAnswer.length === correctAnswers.length &&
            // selectedAnswer.every((answer) => correctAnswers.includes(answer))
            selectedAnswer.every((answer) => answer)

        // adding selected answer, and if answer matches key to result array with current question
        setResult([...result, { ...currentQuestion, selectedAnswer, isMatch }])

        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1)
        } else {
            // how long does it take to finish the quiz
            const timeTaken = quizDetails.totalTime - timer
            setEndTime(timeTaken)
            setShowResultModal(true)
        }
        setSelectedAnswer([])
    };

    const handleAnswerSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target

        if (type === 'MAQs') {
            // if (selectedAnswer.includes(name)) {
            if (name) {
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

    // const handleModal = () => {
    //     setCurrentScreen(ScreenTypes.Result)
    //     document.body.style.overflow = 'auto'
    // };

    // to prevent scrolling when modal is opened
    useEffect(() => {
        if (showTimerModal || showResultModal) {
            document.body.style.overflow = 'hidden'
        }
    }, [showTimerModal, showResultModal]);

    // timer hooks, handle conditions related to time
    useTimer(timer, quizDetails, setEndTime, setTimer, setShowTimerModal, showResultModal);

    return (
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
                selectedAnswer={selectedAnswer} />
            <h2>question</h2>

            <button onClick={onClickNext}>Next</button>
        </div>
    );
};

export default QuestionScreen;