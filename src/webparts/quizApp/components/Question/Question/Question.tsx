import * as React from 'react'
import { FC } from 'react'
import Answer from '../Answer/Answer'


interface QuestionTypes {
    question: string
    code?: string
    image?: string
    type: string
    choices: string[]
    selectedAnswer: string[]
    handleAnswerSelection: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
}

const Question: FC<QuestionTypes> = ({
    question,
    code,
    image,
    type,
    choices,
    selectedAnswer,
    handleAnswerSelection,
}) => {
    return (
        <div>
            <h2>{question}</h2>
            {/* if question contains code snippet then show code */}
            {/* {code && <CodeSnippet code={code} language="javascript" />} */}
            {/* if question contains an image */}

            <div>
                {choices.map((choice, index) => (
                    <Answer
                        choice={choice}
                        index={index}
                        key={index}
                        onChange={(e) => handleAnswerSelection(e, index)}
                        type={type}
                        selectedAnswer={selectedAnswer}
                    />
                ))}
            </div>
        </div>
    )
}

export default Question
