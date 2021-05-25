import { useState } from 'react';

export function useBooleanCheckboxes() {
  const [checked, setChecked] = useState(false);

  function toggleCheckbox(checked: boolean) {
    setChecked(!checked);
  }

  return {
    setChecked,
    checked,
  };
}
