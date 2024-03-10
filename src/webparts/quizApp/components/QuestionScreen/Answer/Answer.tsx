import { FC } from 'react'
import styles from './Answer.module.scss';
//import { device } from '../../../styles/BreakPoints'
import * as React from 'react';
interface AnswerProps {
    index: number;
    choice: string;
    type: string;
    selectedAnswer: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSelected: boolean;
}

const Answer: FC<AnswerProps> = ({ onChange, index, choice, type, selectedAnswer, isSelected }) => {
    // Convert index to alphabet character to show ABCD before question
    const label = String.fromCharCode(65 + index)

    return (
        <div className={isSelected ? `${styles.answer} ${styles.selected}` : styles.answer} key={index}>
            <label>
                <span>{label}.</span>
                <input
                    name={choice}
                    // radio is for checked one option and checkbox is for checked multiple options
                    type={type === 'MAQs' ? 'checkbox' : 'radio'}
                    checked={selectedAnswer.includes(choice)}
                    onChange={onChange}
                />
                {choice}
            </label>
        </div>
    )
}

export default Answer
