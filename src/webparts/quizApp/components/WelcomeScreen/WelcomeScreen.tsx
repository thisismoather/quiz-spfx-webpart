import * as React from 'react';
import { DetailsList, IChoiceGroupOption, IColumn, PrimaryButton, SelectionMode } from '@fluentui/react';
import { useQuiz } from '../../context/QuizContext';
import { ScreenTypes, Topic } from '../../../../shared/types';
import styles from './Welcome.module.scss';
import { useEffect, useState } from 'react';
import { loadQuizData } from '../../../../shared/services/SPService';

interface WelcomeProps {
    //onStartQuiz: () => void;
}

const WelcomeScreen: React.FC<WelcomeProps> = () => {
    const { setCurrentScreen, quizList, selectQuizTopic } = useQuiz();
    const [quizzes, setQuizzes] = useState<Topic[]>([]);
    const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);
    const [topics, setTopics] = useState<IChoiceGroupOption[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(quizList);
                const data = await loadQuizData(quizList);
                console.log(data)
                setQuizzes(data);
                const fetchedTopics = data.map((topic: Topic) => ({ key: topic.topic, text: topic.topic }));
                console.log(fetchedTopics);
                console.log(quizzes);
                setTopics(fetchedTopics);
            } catch (error) {
                console.error('Error loading quiz data', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run once on mount

    const goToQuizDetailsScreen = () => {
        console.log(`Starting quiz for topic: ${selectedTopic}`);
        selectQuizTopic(selectedTopic ?? '');
        setCurrentScreen(ScreenTypes.UserDetails);
    }
    const onItemInvoked = (item: any): void => {
        setSelectedTopic(item.text);
    };
    const columns: IColumn[] = [
        { key: 'title', name: 'text', fieldName: 'text', minWidth: 100, maxWidth: 200, isResizable: false },
        // Add more columns as needed
    ];
    return (
        <div className={styles.container}>
            <h2>Welcome to the Quiz!</h2>
            <section>
                <p>Here are the instructions for the quiz:</p>
                <ul>
                    <li>Select any available quiz you want to attempt.</li>
                    <li>Read each question carefully.</li>
                    <li>Select the correct answer.</li>
                    <li>Click the "Submit" button to submit your answers.</li>
                </ul>
                <DetailsList isHeaderVisible={false} items={topics} columns={columns} selectionMode={SelectionMode.single} onActiveItemChanged={onItemInvoked} onItemInvoked={onItemInvoked} />
            </section>
            <div style={{ textAlign: 'right' }}>
                <PrimaryButton onClick={goToQuizDetailsScreen} disabled={!selectedTopic}>Start Quiz</PrimaryButton>
            </div>

        </div>
    );
};

export default WelcomeScreen;