import { Dispatch, SetStateAction } from 'react';

export enum ScreenTypes {
    Welcome,
    UserDetails,
    QuestionScreen,
    ResultScreen,
}

// Question Types
// 1. MCQs | Multiple Choice | single
// 2. boolean | true/false | single
// 3. MAQs | Multiple Answers | multiple

type Choice = string;
type CorrectAnswers = string[];

export interface Result extends Question {
    selectedAnswer: string[]
    isMatch: boolean
}

export type Question = {
    question: string
    choices: Choice[]
    type: 'MCQs' | 'MAQs' | 'boolean'
    correctAnswers: CorrectAnswers
    score: number
    code?: string
    image?: string
}

export type UserDetails = {
    id: number
    name: string
    email: string
    gender: string
    country: string
    endTime: string
}

export type QuizDetails = {
    totalQuestions: number
    totalScore: number
    totalTime: number
    selectedQuizTopic: string
}

export type QuizContextTypes = {
    currentScreen: ScreenTypes
    setCurrentScreen: Dispatch<SetStateAction<ScreenTypes>>
    quizTopic: string
    selectQuizTopic: (type: string) => void
    questions: Question[]
    setQuestions: Dispatch<SetStateAction<any[]>>
    result: Result[]
    setResult: Dispatch<SetStateAction<any[]>>
    userDetails: UserDetails
    setUserDetails: Dispatch<SetStateAction<UserDetails>>
    timer: number
    setTimer: Dispatch<SetStateAction<number>>
    endTime: number
    setEndTime: (type: number) => void
    quizDetails: QuizDetails
}

export type Topic = {
    topic: string
    level: string
    totalQuestions: number
    totalScore: number
    totalTime: number
    questions: Question[]
}

export type Country = {
    country: string;
}

export type TimeApiResponse = {
    dateTime: string;
    timeZone: string;
    isDaylightSavingTime: boolean;
};


