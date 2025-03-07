import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function CycleHoliday(): React.JSX.Element {
    type Holidays =
        | "Birthday"
        | "Carnival de Barranquilla"
        | "Summer Break"
        | "Halloween"
        | "Christmas";
    const [holiday, changeHoliday] = useState<Holidays>("Birthday");

    const ALPHA_HOLI: Record<Holidays, Holidays> = {
        Birthday: "Carnival de Barranquilla",
        "Carnival de Barranquilla": "Christmas",
        Christmas: "Halloween",
        Halloween: "Summer Break",
        "Summer Break": "Birthday"
    };

    const NEXT_HOLI: Record<Holidays, Holidays> = {
        Birthday: "Carnival de Barranquilla",
        "Carnival de Barranquilla": "Summer Break",
        "Summer Break": "Halloween",
        Halloween: "Christmas",
        Christmas: "Birthday"
    };

    const EMOJI: Record<Holidays, string> = {
        Birthday: "🎂",
        "Carnival de Barranquilla": "🇨🇴",
        "Summer Break": "🏖",
        Halloween: "🎃",
        Christmas: "🎄"
    };

    return (
        <div>
            <Button onClick={() => changeHoliday(ALPHA_HOLI[holiday])}>
                Advance by Alphabet
            </Button>
            <Button onClick={() => changeHoliday(NEXT_HOLI[holiday])}>
                Advance by Year
            </Button>
            <span>{`Holiday: ${EMOJI[holiday]}`}</span>
        </div>
    );
}
