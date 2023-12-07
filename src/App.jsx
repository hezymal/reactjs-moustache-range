import { useState } from "react";
import { Range } from "./components/Range";
import "./App.css";

export const App = () => {
    const [value, setValue] = useState(0);

    return (
        <div className="App">
            <h1>Value: {value.toFixed(2)}</h1>
            <Range value={value} onChange={setValue} />
        </div>
    );
};
