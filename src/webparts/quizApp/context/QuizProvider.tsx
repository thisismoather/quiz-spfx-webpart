import * as React from 'react';
import { ReactNode, useEffect, useState } from 'react'
//import { quiz } from '../data/QuizQuestions'
import { QuizContextTypes, Result, ScreenTypes, Topic } from '../types'
import { QuizContext, initialState } from './QuizContext'

type QuizProviderProps = {
    children: ReactNode
}

export const generalKnowledge: Topic = {
    topic: 'GeneralKnowledge',
    level: 'Beginner',
    totalQuestions: 6,
    totalScore: 60,
    totalTime: 60,
    questions: [
        {
            question: 'What is the name of this reptile?',
            //image: Reptile,
            choices: ['Snake', 'Turtle', 'Crocodile', 'Lizard'],
            type: 'MCQs',
            correctAnswers: ['Turtle'],
            score: 10,
        },
        {
            question: 'In which country is this historical place located?',
            //image: Place,
            choices: ['China', 'Greece', 'India', 'Egypt'],
            type: 'MCQs',
            correctAnswers: ['China'],
            score: 10,
        },
        {
            question: 'This is a famous Pakistani dish. What is the name of this dish?',
            //image: Dish,
            choices: ['Kebab', 'Haleem', 'Paya', 'Biryani'],
            type: 'MCQs',
            correctAnswers: ['Biryani'],
            score: 10,
        },
        {
            question: 'Which famous car is this?',
            //image: Car,
            choices: ['Ford', 'Toyota', 'Mercedes', 'Honda'],
            type: 'MCQs',
            correctAnswers: ['Mercedes'],
            score: 10,
        },
        {
            question: 'To which renowned automobile brand does this logo belong?',
            //image: BrandLogo,
            choices: ['Audi', 'Tesla', 'BMW', 'Hyundai'],
            type: 'MCQs',
            correctAnswers: ['Tesla'],
            score: 10,
        },
        {
            question: 'Do you recognize this iconic mosque? If so, where is it situated?',
            //image: Mosque,
            choices: [
                'Faisal Mosque, Islamabad',
                'Sheikh Zayed Grand Mosque, UAE',
                'Taj Mahal, India',
                'Blue Mosque, Turkey',
            ],

            type: 'MCQs',
            correctAnswers: ['Faisal Mosque, Islamabad'],
            score: 10,
        },
    ],
};

const QuizProvider = ({ children }: QuizProviderProps) => {
    const [timer, setTimer] = useState<number>(initialState.timer)
    const [endTime, setEndTime] = useState<number>(initialState.endTime)
    const [quizTopic, setQuizTopic] = useState<string>(initialState.quizTopic)
    const [result, setResult] = useState<Result[]>(initialState.result)
    const [currentScreen, setCurrentScreen] = useState<ScreenTypes>(
        initialState.currentScreen
    )

    const [questions, setQuestions] = useState(generalKnowledge.questions)

    const {
        questions: quizQuestions,
        totalQuestions,
        totalTime,
        totalScore,
    } = generalKnowledge

    const selectQuizTopic = (topic: string): void => {
        setQuizTopic(topic)
    }

    useEffect(() => {
        setTimer(totalTime)
        setQuestions(quizQuestions)
    }, [quizTopic])

    const quizDetails = {
        totalQuestions,
        totalScore,
        totalTime,
        selectedQuizTopic: quizTopic,
    }

    const quizContextValue: QuizContextTypes = {
        currentScreen,
        setCurrentScreen,
        quizTopic,
        selectQuizTopic,
        questions,
        setQuestions,
        result,
        setResult,
        quizDetails,
        timer,
        setTimer,
        endTime,
        setEndTime,
    }



    return <QuizContext.Provider value={quizContextValue}>{children}</QuizContext.Provider>
}

export default QuizProvider
