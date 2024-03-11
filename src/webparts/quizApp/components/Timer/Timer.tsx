import * as React from 'react';
import { FC } from 'react';
interface CounterProps {
    time: string
}

const Timer: FC<CounterProps> = ({ time }) => {
    return (
        <div>
            <span>{time}</span>
        </div>
    )
}

export default Timer;
