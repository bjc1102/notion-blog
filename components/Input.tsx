import React from 'react';

export interface ITextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
}

const Input: React.FC<ITextInputProps> = (props) => {
  return (
    <input
      className="border-2 text-sm rounded-md block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-accent focus:border-accent outline-none"
      {...props}
    />
  );
};

export default Input;
