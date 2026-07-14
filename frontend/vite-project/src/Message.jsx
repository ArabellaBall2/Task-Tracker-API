import {useState} from "react";

function Message({ text }) {
    const [isVisible, setIsVisible] = useState(true);

    function handleDismiss() {
        setIsVisible(false);
    }

    if (!isVisible) return null;

    return (
        <div className="message">
            <p>{text}</p>
            <button onClick={handleDismiss}>Dismiss</button>
        </div>
    );
}

export default Message;

