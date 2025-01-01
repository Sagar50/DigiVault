import React, { useState} from "react";
import "./CustomAlert.css"; // Import the CSS
import close from "../../res/close.svg";

const CustomAlert = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(true); // Track visibility of the alert

    return (
        <div
            className={`custom-alert-container flex cursor-default ${isVisible ? "slide-in" : ""}`}
            onClick={onClose}
        >
            <p className="alert-message">{message}</p>
            <img
                src={close}
                onClick={() => { setIsVisible(false); onClose(); }}
                alt="close"
                className="cursor-pointer w-5 h-5"
            />
        </div>
    );
};

export default CustomAlert;
