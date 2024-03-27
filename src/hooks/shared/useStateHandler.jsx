import { useState } from "react";

export const useStateHandler = (initialState) => {
  const [input, setInput] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  return [input, handleInputChange, setInput];
};
