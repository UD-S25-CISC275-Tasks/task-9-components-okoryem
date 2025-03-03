import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    return questions.filter((ques: Question): boolean => ques.published);
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    let arr = questions.map(
        (ques: Question): Question => ({ ...ques, options: [...ques.options] }),
    );
    return arr.filter((ques) => 
        (ques.type === "short_answer_question"
            && (ques.body !== "" || ques.expected !== "")
            || (ques.type === "multiple_choice_question" && ques.options.length !== 0)
    ));
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    return questions.find((ques: Question): boolean => ques.id === id) || null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    return questions.filter((ques: Question): boolean => ques.id !== id);
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    return questions.map((ques: Question): string => ques.name);
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    return questions
        .map((ques: Question): number => ques.points)
        .reduce((acc, num) => acc + num, 0);
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    return questions
        .filter((ques: Question): boolean => ques.published)
        .map((ques: Question): number => ques.points)
        .reduce((acc, num) => acc + num, 0);
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    let quesCSV = questions
        .map(
            (ques: Question): string =>
                `${ques.id},${ques.name},${ques.options.length},${ques.points},${ques.published}`,
        )
        .join("\n");
    return "id,name,options,points,published\n" + quesCSV;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    return questions.map(
        (ques: Question): Answer => ({
            questionId: ques.id,
            text: "",
            submitted: false,
            correct: false,
        }),
    );
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    return questions.map(
        (ques: Question): Question => ({
            ...ques,
            options: [...ques.options],
            published: true,
        }),
    );
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    let arr = questions.filter(
        (ques) => ques.type === "multiple_choice_question",
    );
    return arr.length === questions.length || arr.length == 0;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    let arr = questions.map(
        (ques: Question): Question => ({ ...ques, options: [...ques.options] }),
    );
    return [...arr, makeBlankQuestion(id, name, type)];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    return questions.map(
        (ques: Question): Question =>
            ques.id !== targetId ?
                { ...ques, options: [...ques.options] }
            :   { ...ques, options: [...ques.options], name: newName },
    );
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    return questions.map(
        (ques: Question): Question =>
            ques.id !== targetId ? { ...ques, options: [...ques.options] }
            : newQuestionType === "multiple_choice_question" ?
                { ...ques, options: [...ques.options], type: newQuestionType }
            :   { ...ques, options: [], type: newQuestionType },
    );
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    return questions.map(
        (ques: Question): Question =>
            ques.id !== targetId ? { ...ques, options: [...ques.options] }
            : targetOptionIndex === -1 ?
                { ...ques, options: [...ques.options, newOption] }
            :   {
                    ...ques,
                    options: [
                        ...ques.options.slice(0, targetOptionIndex),
                        newOption,
                        ...ques.options.slice(targetOptionIndex + 1),
                    ],
                },
    );
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    return questions.reduce(
        (acc: Question[], ques: Question) =>
            ques.id !== targetId ?
                [...acc, { ...ques, options: [...ques.options] }]
            :   [
                    ...acc,
                    { ...ques, options: [...ques.options] },
                    duplicateQuestion(newId, ques),
                ],
        [],
    );
}
