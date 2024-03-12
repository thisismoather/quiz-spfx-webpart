import { SPFI, spfi } from "@pnp/sp";
import { getSP } from "../../webparts/quizApp/config";
import { Caching } from "@pnp/queryable";
import { QuizDetails, Result, TimeApiResponse } from "../types";
import { formatTime } from "../../webparts/quizApp/utils/helper";

const timeApiUrl = "https://prod-248.westeurope.logic.azure.com/workflows/3dea4dbbf09d40f59f17225ffd6d7265/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7cunIzBYKssiMtjG-aN25RHKT66B_j3rdFbw1Agm7W8&TimeZone=";

/**
 * Loads quiz data from SharePoint list.
 * @param list - The ID of the SharePoint list.
 * @returns An array of quiz objects.
 */
const loadQuizData = async (list: string) => {
    try {
        const _sp: SPFI = getSP();
        const spCache = spfi(_sp).using(Caching({ store: "session" }));

        const quizListItems = await spCache.web.lists.getById(list).items();

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

/**
 * Saves user details to SharePoint list.
 * @param list - The ID of the SharePoint list.
 * @param userDetails - The user details to be saved.
 * @param time - The time in milliseconds.
 * @returns The newly created item in the SharePoint list.
 */
const saveUserDetails = async (list: string, userDetails: any, time: number) => {
    try {
        const _sp: SPFI = getSP();
        const timeResponse = await getStartAndEndTime(time)
        const startTime = timeResponse.originalDateTime;
        const endTime = timeResponse.calculationResult.dateTime;
        const item = await spfi(_sp).web.lists.getById(list).items.add({
            Title: userDetails.name,
            Email: userDetails.email,
            Country: userDetails.country,
            Gender: userDetails.gender,
            StartTime: startTime,
            EndTime: endTime
        });
        return item;
    } catch (error) {
        console.log("Error saving data to SharePoint list", error)
    }
}


/**
 * Adds quiz details to an existing item in the SharePoint list.
 * @param list - The ID of the SharePoint list.
 * @param itemId - The ID of the item in the SharePoint list.
 * @param quizDetails - The quiz details to be added.
 * @param result - The quiz result.
 * @param endTime - The end time of the quiz.
 * @returns The updated item in the SharePoint list.
 */
const addQuizDetails = async (list: string, itemId: number, quizDetails: QuizDetails, result: Result[], endTime: string) => {
    try {
        const _sp: SPFI = getSP();
        const resp = await getCurrentTime()
        const currentTime = new Date(resp.dateTime);
        const deadline = new Date(endTime)
        if (currentTime <= deadline) {
            const item = await spfi(_sp).web.lists.getById(list).items.getById(itemId).update({
                QuizTitle: quizDetails.selectedQuizTopic,
                TotalQuestions: quizDetails.totalQuestions,
                TotalScore: quizDetails.totalScore,
                TotalTime: quizDetails.totalTime,
                Questions: JSON.stringify(result)
            });
            return item;
        }
        return null

    } catch (error) {
        console.log("Error saving data to SharePoint list", error)
    }

}

/**
 * Gets the current time from the TimeIO API.
 * @returns A promise that resolves to the current time.
 */
const getCurrentTime = async (): Promise<TimeApiResponse> => {
    try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const response = await fetch(`${timeApiUrl}${timezone}`);

        if (!response.ok) {
            throw new Error(`TimeIO API request failed with status: ${response.status}`);
        }

        const responseJson: TimeApiResponse = await response.json();
        return responseJson;
    } catch (error) {
        console.error('Error calling TimeIO API:', error);
        throw new Error('Failed to get current time from TimeIO API');
    }
};

/**
 * Gets the start and end time based on the provided time.
 * @param time - The time in milliseconds.
 * @returns A promise that resolves to the start and end time.
 */
const getStartAndEndTime = async (time: number): Promise<any> => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeSpan = `00:00:0${formatTime(time)}`
    const api = `https://prod-40.westeurope.logic.azure.com/workflows/1d1eb431f1534c4a973d5753eae4ac2b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=sljpjluDmt4cEmsgui1ybgCi0VMh4sHPWBSf468eTVQ&TimeZone=${timezone}&timeSpan=${timeSpan}`
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error(`TimeIO API request failed with status: ${response.status}`);
        }

        const responseJson: TimeApiResponse = await response.json();
        return responseJson;
    } catch (error) {
        console.error('Error calling TimeIO API:', error);
        throw new Error('Failed to get current time from TimeIO API');
    }

};


export { loadQuizData, saveUserDetails, addQuizDetails };
//export default loadQuizData;
