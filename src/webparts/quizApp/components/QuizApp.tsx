import * as React from 'react';
import styles from './QuizApp.module.scss';
import type { IQuizAppProps } from './IQuizAppProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import QuizProvider from '../context/QuizProvider';
import Main from './Main';

const QuizApp: React.FC<IQuizAppProps> = ({
  description,
  isDarkTheme,
  environmentMessage,
  hasTeamsContext,
  userDisplayName
}) => {
  return (
    <section className={`${styles.quizApp} ${hasTeamsContext ? styles.teams : ''}`}>
      <QuizProvider>
        <Main />
      </QuizProvider>
    </section>
  );
};

export default QuizApp;