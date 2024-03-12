import * as React from 'react';
import styles from './QuizApp.module.scss';
import type { IQuizAppProps } from './IQuizAppProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import QuizProvider from '../context/QuizProvider';
import Main from './Main/Main';

/**
 * Represents the QuizApp component.
 * @param {IQuizAppProps} props - The props for the QuizApp component.
 * @returns {JSX.Element} The rendered QuizApp component.
 */
const QuizApp: React.FC<IQuizAppProps> = ({
  quizList,
  userQuizList,
  isDarkTheme,
  environmentMessage,
  hasTeamsContext,
  userDisplayName
}) => {
  return (
    <section className={`${styles.quizApp} ${hasTeamsContext ? styles.teams : ''}`}>
      <QuizProvider quizList={quizList} userQuizList={userQuizList}>
        <Main />
      </QuizProvider>
    </section>
  );
};

export default QuizApp;