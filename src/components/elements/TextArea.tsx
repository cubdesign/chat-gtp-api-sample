import { FC, useEffect, useRef } from "react";

export type TextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  containerClassName?: string;
  textareaClassName?: string;
  textareaWrapperClassName?: string;
};

const TextArea: FC<TextAreaProps> = ({
  containerClassName = "",
  textareaClassName = "",
  textareaWrapperClassName = "",
  value,
  ...props
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.current.style.height = "0px";

      const scrollHeight = textAreaRef.current.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);

  return (
    <div className={`${containerClassName}`}>
      <div
        className={`border py-2 px-3 shadow rounded ${textareaWrapperClassName}`}
      >
        <textarea
          {...props}
          ref={textAreaRef}
          className={`
         w-full
         resize-none
         text-gray-600 focus:outline-none 
         ${textareaClassName}`}
        />
      </div>
    </div>
  );
};

export default TextArea;
