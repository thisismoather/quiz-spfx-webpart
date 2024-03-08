import * as React from 'react';
import { FC } from 'react';
//import styled from 'styled-components';

//import { TimerIcon } from '../../../../config/icons'
//import { Flex } from '../../../../styles/Global'
//import { device } from '../../../../styles/BreakPoints'

// const TimerStyle = styled.span`
//   min-width: 60px;
//   font-size: clamp(16px, 5vw, 24px);
//   font-weight: 500;
//   margin-left: 8px;


// `;
//color: ${({ theme }) => theme.colors.themeColor};
// @media ${device.md} {
//     margin-left: 5px;
//     min-width: 55px;
//   }
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
