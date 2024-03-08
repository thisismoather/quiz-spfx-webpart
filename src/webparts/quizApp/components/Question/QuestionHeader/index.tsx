import { FC } from 'react'
//import styled from 'styled-components'

//import { Flex } from '../../../styles/Global'
//import { addLeadingZero, formatTime } from '../../../utils/helpers'

import Timer from '../../Timer';
import * as React from 'react';

// const ActiveQuestionNo = styled.span`
//   font-size: clamp(40px, 5vw, 60px);
//   font-weight: 500;
//   color: ${({ theme }) => theme.colors.themeColor};
// `

// const TotalQuestionNo = styled.span`
//   font-size: clamp(20px, 5vw, 30px);
//   font-weight: 500;
//   color: ${({ theme }) => theme.colors.darkerGray};
// `

interface QuizHeaderProps {
    activeQuestion: number
    totalQuestions: number
    timer: number
}

const QuizHeader: FC<QuizHeaderProps> = ({ activeQuestion, totalQuestions, timer }) => {
    return (
        <Timer time={`${timer}`} />
    )
}

export default QuizHeader
