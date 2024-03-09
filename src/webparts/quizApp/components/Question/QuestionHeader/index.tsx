import { FC } from 'react'
import { Text, Icon, Stack, Separator } from '@fluentui/react';
import styles from './QuestionHeader.module.scss';

//import { Flex } from '../../../styles/Global'
//import { addLeadingZero, formatTime } from '../../../utils/helpers'

//import Timer from '../../Timer';
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
        <>
            <Stack horizontal horizontalAlign="space-between">
                <Text variant="large">{`${1} of ${10} questions remaining`}</Text>
                <Stack horizontal verticalAlign="center">
                    <Icon iconName="Clock" />
                    <span className={styles.timer}>{timer}</span>
                </Stack>
            </Stack>
            <Separator />
        </>
    );
    // return (
    //     <div className={styles.header}>
    //         <Timer time={`${timer}`} />
    //     </div>
    // )
}

export default QuizHeader
