# SPFx Quiz Web Part Deployment and Configuration Guide

This guide provides instructions on how to deploy and configure the SPFx Quiz web part. This web part depends on two SharePoint lists: Quiz and User Quiz.

## Prerequisites

- SharePoint Online tenant
- SharePoint Framework development environment

## Deployment

1. Clone the repository or download the SPFx solution package (.sppkg file).
2. Upload the solution package to the SharePoint App Catalog.
3. Deploy the solution package.

## Configuration

### Quiz List

Create a new list named "Quiz" with the following columns:

- Title (Type: Single line of text): The title of the quiz.
- Level (Type: Choice): The difficulty level of the quiz. Options: Beginner, Intermediate, Advanced.
- TotalQuestions (Type: Number): The total number of questions in the quiz.
- TotalScore (Type: Number): The total score of the quiz.
- Questions (Type: Multiple lines of text): The questions for the quiz.

### User Quiz List

Create a new list named "User Quiz" with the following columns:

- Title (Type: Single line of text): The title of the user quiz.
- Email (Type: Single line of text): The email of the user.
- Country (Type: Single line of text): The country of the user.
- Gender (Type: Choice): The gender of the user.
- QuizTitle (Type: Single line of text): The title of the quiz that the user took.
- TotalQuestions (Type: Number): The total number of questions in the quiz.
- TotalScore (Type: Number): The total score of the quiz.
- Questions (Type: Multiple lines of text): The questions in the quiz.
- StartTime (Type: Date and Time): The time when the user started the quiz.
- EndTime (Type: Date and Time): The time when the user finished the quiz.

## Using the Web Part

1. Add the web part to a page.
2. Configure the web part properties as needed.

## Troubleshooting

If you encounter any issues while deploying or configuring the web part, please check the following:

- Ensure that you have the necessary permissions to deploy SPFx solutions and create lists in SharePoint.
- Ensure that the names of the lists and their columns match exactly with the names specified in this guide.
- If the web part does not display the quizzes correctly, ensure that the Quiz list contains at least one item.

