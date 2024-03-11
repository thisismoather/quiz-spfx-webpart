import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../../../shared/types'
import Welcome from '../Welcome'
import * as React from 'react'
import UserDetails from '../UserDetails'
import QuestionScreen from '../QuestionScreen/QuestionScreen'
import ResultScreen from '../ResultScreen/ResultScreen'

function Main() {
    const { currentScreen } = useQuiz()

    const screenComponents = {
        [ScreenTypes.Welcome]: <Welcome />,
        [ScreenTypes.UserDetails]: <UserDetails />,
        [ScreenTypes.QuestionScreen]: <QuestionScreen />,
        [ScreenTypes.ResultScreen]: <ResultScreen />,
    }

    const ComponentToRender = screenComponents[currentScreen] || <Welcome />

    return <>{ComponentToRender}</>
}

export default Main
