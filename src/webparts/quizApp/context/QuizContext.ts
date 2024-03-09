import { createContext, useContext } from 'react'
import { QuizContextTypes, ScreenTypes } from '../types'

export const initialState: QuizContextTypes = {
    currentScreen: ScreenTypes.Welcome,
    setCurrentScreen: () => { },
    quizTopic: 'React',
    selectQuizTopic: () => { },
    questions: [],
    setQuestions: () => { },
    result: [],
    setResult: () => { },
    timer: 15,
    setTimer: () => { },
    endTime: 0,
    setEndTime: () => { },
    quizDetails: {
        totalQuestions: 0,
        totalScore: 0,
        totalTime: 0,
        selectedQuizTopic: 'React',
    },
}

export const QuizContext = createContext<QuizContextTypes>(initialState)

export function useQuiz(): QuizContextTypes {
    return useContext(QuizContext)
}