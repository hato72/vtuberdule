import React from "react";

interface TextComponentProps{
    text: string;
}

const TextComponent: React.FC<TextComponentProps> = ({text}) => {
    return (
        <div className="w-full text-center py-2 bg-blue-200 text-gray-700 font-bold">
            {text}
        </div>
    )
}

export default TextComponent;