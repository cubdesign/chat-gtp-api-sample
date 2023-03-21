import { FC } from "react";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
  inputClassName?: string;
};

const TextField: FC<TextFieldProps> = ({
  containerClassName = "",
  inputClassName = "",
  ...props
}) => {
  return (
    <div className={`${containerClassName}`}>
      <input
        {...props}
        className={`
        text-gray-600 shadow border py-2 px-3 w-full rounded
         focus:outline-none  
         ${inputClassName}`}
      />
    </div>
  );
};

export default TextField;
