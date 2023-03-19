import { FC, useState } from "react";
import TextArea from "@/components/elements/TextArea";

type InputFormProps = {
  className?: string;
  onSubmit?: (value: string) => void;
};

const InputForm: FC<InputFormProps> = ({ className = "", onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={`border-t-2 p-3 ${className}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const text = inputValue.trim();

          if (onSubmit) {
            if (text !== "") {
              onSubmit(text);
            }
          }

          setInputValue("");
        }}
        className="flex flex-row justify-between items-center"
      >
        <TextArea
          value={inputValue}
          onChange={handleChange}
          containerClassName="w-full"
        />
        <button type="submit" className="w-[60px]">
          送信
        </button>
      </form>
    </div>
  );
};

export default InputForm;
