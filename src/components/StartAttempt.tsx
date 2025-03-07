import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): React.JSX.Element {
    const [attempts, setAttempts] = useState<number>(4);
    const [inProgress, changeProgress] = useState<boolean>(false);

    function start(): void {
        let newAttempts = attempts - 1;
        changeProgress(true);
        setAttempts(newAttempts);
    }

    function increase(): void {
        let newAttempts = attempts + 1;
        setAttempts(newAttempts);
    }

    return (
        <div>
            <Button onClick={start} disabled={inProgress || attempts === 0}>
                Start Quiz
            </Button>
            <Button
                onClick={() => changeProgress(false)}
                disabled={!inProgress}
            >
                Stop Quiz
            </Button>
            <Button onClick={increase} disabled={inProgress}>
                Mulligan
            </Button>
            <div>{attempts}</div>
        </div>
    );
}
