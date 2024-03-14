# SPFx Quiz Web Part Deployment and Configuration Guide

This guide provides instructions on how to deploy and configure the SPFx Quiz web part. This web part depends on two SharePoint lists: Quiz and User Quiz.

## Prerequisites

- SharePoint Online tenant
- SharePoint Framework development environment
- A Quiz list with at least one record. (See the "Quiz List" section below for details on how to set this up)
- A User Quiz list. (See the "User Quiz List" section below for details on how to set this up)

## Deployment

1. Clone or download this repository.
2. Run the following commands in your terminal:

```
npm install # to install the npm dependencies
gulp serve # to display in Developer Workbench (recommend using your tenant workbench so you can test with real lists within your site)

```

3. To package and deploy, run the following commands in your terminal:

```
gulp bundle --ship 
gulp package-solution --ship

```
4. Add the .sppkg file to your SharePoint App Catalog.

## Configuration

### Quiz List

Create a new list named "Quiz" with the following columns:

- Title (Type: Single line of text): The title of the quiz.
- Level (Type: Choice): The difficulty level of the quiz. Options: Beginner, Intermediate, Advanced.
- TotalQuestions (Type: Number): The total number of questions in the quiz.
- TotalScore (Type: Number): The total score of the quiz.
- Questions (Type: Multiple lines of text): An array of question objects. Each object has the following properties:
  - question: The question text.
  - choices: An array of possible answers.
  - type: The type of question. Possible values are 'MCQs', 'boolean', and 'MAQs'.
  - correctAnswers: An array of correct answers.
  - score: The score for the question.

  Example of Questions array:

```json
[
    {
      "question": "What is the capital of France?",
      "choices": ["Paris", "London", "Berlin", "Madrid"],
      "type": "MCQs",
      "correctAnswers": ["Paris"],
      "score": 10
    },
    {
      "question": "Is JavaScript a statically typed language?",
      "choices": ["Yes", "No"],
      "type": "boolean",
      "correctAnswers": ["No"],
      "score": 10
    }
]
```

> **Note:** In order to start the Quiz app, the Quiz list must have at least one record.

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

> **Note:** Items in the User Quiz list will be added by the web part itself.

## Using the Web Part

1. Add the web part to a page.
2. Edit the web part properties and select the Quiz list and User Quiz list created earlier.
> **Note:** The lists can have any name, but the column names must match exactly with the names specified in this guide for the web part to function correctly.

## Troubleshooting

If you encounter any issues while deploying or configuring the web part, please check the following:

- Ensure that you have the necessary permissions to deploy SPFx solutions and create lists in SharePoint.
- Ensure that the names of the lists and their columns match exactly with the names specified in this guide.
- If the web part does not display the quizzes correctly, ensure that the Quiz list contains at least one item.

