import * as React from 'react'
import { FC } from 'react'


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
    return (<h2>Question</h2>);
    //   return (
    //     <QuestionContainer>
    //       <QuestionStyle>{question}</QuestionStyle>
    //       {/* if question contains code snippet then show code */}
    //       {code && <CodeSnippet code={code} language="javascript" />}
    //       {/* if question contains an image */}
    //       {image && <QuizImage image={image} />}
    //       <AnswersContainer>
    //         {choices.map((choice, index) => (
    //           <Answer
    //             choice={choice}
    //             index={index}
    //             key={index}
    //             onChange={(e) => handleAnswerSelection(e, index)}
    //             type={type}
    //             selectedAnswer={selectedAnswer}
    //           />
    //         ))}
    //       </AnswersContainer>
    //     </QuestionContainer>
    //   )
}

export default Question
