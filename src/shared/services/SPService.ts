import { SPFI, spfi } from "@pnp/sp";
import { getSP } from "../../webparts/quizApp/config";
import { Caching } from "@pnp/queryable";

const loadQuizData = async () => {
    try {
        const _sp: SPFI = getSP();
        const spCache = spfi(_sp).using(Caching({ store: "session" }));

        const quizListItems = await spCache.web.lists.getByTitle("Quiz").items();

        const quizzes = quizListItems.map((item: any) => {
            const questions = eval(item.Questions);
            return {
                topic: item.Title,
                level: item.Level,
                totalQuestions: item.TotalQuestions,
                totalScore: item.TotalScore,
                totalTime: item.TotalTime,
                questions: questions.map((question: any) => {
                    return {
                        question: question.question,
                        choices: question.choices,
                        type: question.type,
                        correctAnswers: question.correctAnswers,
                        score: question.score
                    };
                })
            };
        });
        return quizzes

    } catch (error) {
        console.error("Error loading quiz data", error);
        return []
    }
};

export default loadQuizData;
