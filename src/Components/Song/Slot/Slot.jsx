import React from "react";
import "./Slot.scss";

function Slot(props) {
    return (
        <div>
            <p>{this.props.original_lyrics} {this.props.translated_lyrics}</p>
        </div>
    );
}

export default Slot;