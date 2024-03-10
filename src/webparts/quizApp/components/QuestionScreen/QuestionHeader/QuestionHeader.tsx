import { FC } from 'react'
import { Text, Icon, Stack, Separator } from '@fluentui/react';
import styles from './QuestionHeader.module.scss';
import * as React from 'react';
import { addLeadingZero, formatTime } from '../../../utils/helper';

interface QuizHeaderProps {
    activeQuestion: number
    totalQuestions: number
    timer: number
}

const QuestionHeader: FC<QuizHeaderProps> = ({ activeQuestion, totalQuestions, timer }) => {
    return (
        <>
            <Stack horizontal horizontalAlign="space-between">
                <div>
                    <Text variant="large" className={styles['active-question-no']}>{`${addLeadingZero(activeQuestion + 1)}`}</Text>
                    <Text variant="large" className={styles['total-question']}>{`/${addLeadingZero(totalQuestions)}`}</Text>
                </div>
                <Stack horizontal verticalAlign="center">
                    <Icon iconName="Clock" />
                    <span className={styles.timer}>{formatTime(timer)}</span>
                </Stack>
            </Stack>
            <Separator />
        </>
    );
}

export default QuestionHeader
