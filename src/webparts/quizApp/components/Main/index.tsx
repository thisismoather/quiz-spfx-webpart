import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../../../shared/types'
import Welcome from '../Welcome'
import * as React from 'react'
import UserDetailsScreen from '../UserDetailsScreen/UserDetailsScreen'
import QuestionScreen from '../QuestionScreen/QuestionScreen'
import ResultScreen from '../ResultScreen/ResultScreen'

function Main() {
    const { currentScreen } = useQuiz()

    const screenComponents = {
        [ScreenTypes.Welcome]: <Welcome />,
        [ScreenTypes.UserDetails]: <UserDetailsScreen />,
        [ScreenTypes.QuestionScreen]: <QuestionScreen />,
        [ScreenTypes.ResultScreen]: <ResultScreen />,
    }

    const ComponentToRender = screenComponents[currentScreen] || <Welcome />

    return <>{ComponentToRender}</>
}

export default Main
