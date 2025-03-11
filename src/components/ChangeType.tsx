import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { QuestionType } from "../interfaces/question";

export function ChangeType(): React.JSX.Element {
    const [type, setType] = useState<QuestionType>("short_answer_question");

    const QUESTION_TRANSITIONS: Record<QuestionType, QuestionType> = {
        multiple_choice_question: "short_answer_question",
        short_answer_question: "multiple_choice_question"
    };

    function changeQuestionType(): void {
        const newQuestionType = QUESTION_TRANSITIONS[type];
        setType(newQuestionType);
    }

    return (
        <div>
            <Button onClick={changeQuestionType}>Change Type</Button>
            {type === "short_answer_question"
                ? "Short Answer"
                : "Multiple Choice"}
        </div>
    );
}
