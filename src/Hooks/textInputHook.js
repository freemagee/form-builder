import { useState, useEffect } from 'react';

export const useInput = (initialValue, cb) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    cb(value);
  });

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  };
};
