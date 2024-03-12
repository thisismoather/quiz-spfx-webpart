import * as React from 'react';
import { ReactNode, useEffect, useState } from 'react'
// import { QuizContextTypes, Result, ScreenTypes, Topic } from '../../../shared/types'
import { Question, Result, ScreenTypes, Topic, UserDetails } from '../../../shared/types'
import { QuizContext, initialState } from './QuizContext'
import { loadQuizData } from '../../../shared/services/SPService';

type QuizProviderProps = {
    quizList: string
    userQuizList: string
    children: ReactNode
}

const QuizProvider = ({ children, quizList, userQuizList }: QuizProviderProps) => {
    const [quizzes, setQuizzes] = useState<Topic[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [timer, setTimer] = useState<number>(initialState.timer)
    const [endTime, setEndTime] = useState<number>(initialState.endTime)
    const [quizTopic, setQuizTopic] = useState<string>(initialState.quizTopic)
    const [result, setResult] = useState<Result[]>(initialState.result)
    const [userDetails, setUserDetails] = useState<UserDetails>(initialState.userDetails)
    const [currentScreen, setCurrentScreen] = useState<ScreenTypes>(
        initialState.currentScreen
    )
    const [questions, setQuestions] = useState<Question[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await loadQuizData(quizList);
                setQuizzes(data);
                setLoading(false);
            } catch (error) {
                console.error('Error loading quiz data', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run once on mount


    useEffect(() => {
        if (quizzes.length > 0) {
            const { questions: quizQuestions, totalTime } = quizzes[0];
            setTimer(totalTime);
            setQuestions(quizQuestions);
        }
    }, [quizzes, quizTopic]);


    const selectQuizTopic = (topic: string): void => {
        setQuizTopic(topic)
    }


    if (loading) {
        return <div>Loading...</div>
    }

    // const quizContextValue = {
    //     quizList,
    //     userQuizList,
    //     currentScreen,
    //     setCurrentScreen,
    //     quizTopic,
    //     selectQuizTopic,
    //     questions,
    //     setQuestions,
    //     result,
    //     setResult,
    //     quizDetails,
    //     userDetails,
    //     setUserDetails,
    //     timer,
    //     setTimer,
    //     endTime,
    //     setEndTime,
    // }


    const quizContextValue = {
        quizList,
        userQuizList,
        currentScreen,
        setCurrentScreen,
        quizTopic,
        selectQuizTopic,
        questions,
        setQuestions,
        result,
        setResult,
        quizDetails: {
            totalQuestions: questions.length,
            totalScore: questions.reduce((acc, q) => acc + q.score, 0),
            totalTime: timer, // Add totalTime property
            selectedQuizTopic: quizTopic,
        },
        userDetails,
        setUserDetails,
        timer,
        setTimer,
        endTime,
        setEndTime,
    }

    return <QuizContext.Provider value={quizContextValue}>{children}</QuizContext.Provider>
}

export default QuizProvider
