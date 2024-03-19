import React from "react";

interface TextComponentProps{
    text: string;
}

const TextComponent: React.FC<TextComponentProps> = ({text}) => {
    return (
        <div className="w-full h-10 bg-white border border-[#98a0fb] text-[#98a0fb] rounded-md flex justify-center items-center mx-auto my-4">
            {text}
        </div>
    )
}

export default TextComponent;