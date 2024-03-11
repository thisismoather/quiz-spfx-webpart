import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../../../shared/types'
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen'
import * as React from 'react'
import UserDetailsScreen from '../UserDetailsScreen/UserDetailsScreen'
import QuestionScreen from '../QuestionScreen/QuestionScreen'
import ResultScreen from '../ResultScreen/ResultScreen'

function Main() {
    const { currentScreen } = useQuiz()

    const screenComponents = {
        [ScreenTypes.Welcome]: <WelcomeScreen />,
        [ScreenTypes.UserDetails]: <UserDetailsScreen />,
        [ScreenTypes.QuestionScreen]: <QuestionScreen />,
        [ScreenTypes.ResultScreen]: <ResultScreen />,
    }

    const ComponentToRender = screenComponents[currentScreen] || <WelcomeScreen />

    return <>{ComponentToRender}</>
}

export default Main
