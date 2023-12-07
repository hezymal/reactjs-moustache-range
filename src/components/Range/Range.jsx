import { useEffect, useRef, useState } from "react";
import "./Range.css";

export const Range = ({ value, onChange }) => {
    const containerRef = useRef(null);
    const mousePressed = useRef(false);
    const [fillWidth, setFillWidth] = useState(0);

    useEffect(() => {
        const handleDocumentMouseOut = () => {
            mousePressed.current = false;
        };

        document.addEventListener("mouseup", handleDocumentMouseOut);

        return () => {
            document.addEventListener("mouseup", handleDocumentMouseOut);
        };
    }, []);

    useEffect(() => {
        const containerWidth = containerRef.current.offsetWidth;
        setFillWidth(containerWidth * value);
    }, [value]);

    const setValue = (fillWidth) => {
        const containerWidth = containerRef.current.offsetWidth;
        onChange(fillWidth / containerWidth);
    };

    const handleMouseDown = () => {
        mousePressed.current = true;
    };

    const handleMouseMove = (event) => {
        if (mousePressed.current) {
            setValue(event.clientX - event.currentTarget.offsetLeft);
        }
    };

    const handleMouseUp = (event) => {
        mousePressed.current = false;
        setValue(event.clientX - event.currentTarget.offsetLeft);
    };

    return (
        <div
            className="Range"
            ref={containerRef}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
        >
            <svg
                className="Range_Svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 170 46"
            >
                <defs>
                    <clipPath id="clip">
                        <path
                            d="
                                M 15 0
                                C 20 30, 45 0, 65 0
                                C 85 0, 95 30, 65 40
                                C 35 50, 10 45, 5 35
                                C 0 30, 0 10, 15 0
                            "
                        />
                        <path
                            d="
                                M 155 0
                                C 150 30, 125 0, 105 0
                                C 85 0, 75 30, 105 40
                                C 135 50, 160 45, 165 35
                                C 170 30, 170 10, 155 0
                            "
                        />
                    </clipPath>
                </defs>
                <rect
                    x="0"
                    y="0"
                    width="170"
                    height="46"
                    fill="rgba(0, 0, 0, 0.5)"
                    clipPath="url(#clip)"
                />
                <rect
                    x="0"
                    y="0"
                    width={fillWidth}
                    height="46"
                    fill="white"
                    clipPath="url(#clip)"
                />
            </svg>
        </div>
    );
};
