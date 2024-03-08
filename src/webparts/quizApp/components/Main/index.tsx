import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../types'
import Welcome from '../Welcome'
import * as React from 'react'
import UserDetails from '../UserDetails'
import QuestionScreen from '../Question/QuestionScreen'

function Main() {
    const { currentScreen } = useQuiz()

    const screenComponents = {
        [ScreenTypes.Welcome]: <Welcome />,
        [ScreenTypes.UserDetails]: <UserDetails />,
        [ScreenTypes.Question]: <QuestionScreen />,
        [ScreenTypes.Result]: <Welcome />,
    }

    const ComponentToRender = screenComponents[currentScreen] || <Welcome />

    return <>{ComponentToRender}</>
}

export default Main
