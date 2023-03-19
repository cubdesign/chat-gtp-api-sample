import { FC, useState } from "react";
import TextArea from "@/components/elements/TextArea";

type InputFormProps = {
  className?: string;
};

const InputForm: FC<InputFormProps> = ({ className = "" }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={`border-t-2 p-3 ${className}`}>
      <form>
        <TextArea value={inputValue} onChange={handleChange} />
      </form>
    </div>
  );
};

export default InputForm;
