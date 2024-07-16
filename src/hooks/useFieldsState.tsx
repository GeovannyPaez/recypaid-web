import React, { useState } from "react";

export default function useFieldsState<T extends Record<string, any>>(
  initialState: T
) {
  const [fields, setFields] = useState<T>(initialState as T);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  return { fields, handleChange };
}
