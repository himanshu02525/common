import { useState } from 'react';

const useCharacterLimit = (initialValue = '', limit = 255) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= limit) {
      setValue(inputValue);
    }
  };

  const reset = () => setValue('');

  return {
    value,
    setValue,
    handleChange,
    reset,
    count: value.length,
    isFull: value.length >= limit,
    limit
  };
};

export default useCharacterLimit;