import * as React from 'react';
import { FC } from 'react';
import Answer from '../Answer/Answer';
import styles from './Question.module.scss';


interface QuestionTypes {
    question: string
    code?: string
    image?: string
    type: string
    choices: string[]
    selectedAnswer: string[]
    handleAnswerSelection: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
    selectedAnswerIndex: number | null | undefined
}

const Question: FC<QuestionTypes> = ({
    question,
    code,
    image,
    type,
    choices,
    selectedAnswer,
    handleAnswerSelection,
    selectedAnswerIndex
}) => {
    return (
        <div className={styles.container}>
            <h2>{question}</h2>
            {/* if question contains code snippet then show code */}
            {/* {code && <CodeSnippet code={code} language="javascript" />} */}
            {/* if question contains an image */}

            <div className={styles.answer}>
                {choices.map((choice, index) => (
                    <Answer
                        choice={choice}
                        index={index}
                        key={index}
                        onChange={(e) => handleAnswerSelection(e, index)}
                        type={type}
                        selectedAnswer={selectedAnswer} isSelected={selectedAnswerIndex === index}
                    />
                ))}
            </div>
        </div>
    )
}

export default Question
