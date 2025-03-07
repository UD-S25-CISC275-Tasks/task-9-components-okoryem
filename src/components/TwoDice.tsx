import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): React.JSX.Element {
    const [val1, setVal1] = useState<number>(1);
    const [val2, setVal2] = useState<number>(6);

    return (
        <div>
            <Button onClick={() => setVal1(d6())}>Roll Left</Button>
            <span data-testid="left-die">{val1}</span>
            <Button onClick={() => setVal2(d6())}>Roll Right</Button>
            <span data-testid="right-die">{val2}</span>
            <div>
                {val1 === val2 ? (
                    val1 === 1 ? (
                        <span>Lose</span>
                    ) : (
                        <span>Win</span>
                    )
                ) : (
                    <span></span>
                )}
            </div>
        </div>
    );
}
