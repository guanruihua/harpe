
import { useCallback, useState } from 'react';

// Hook
// Parameter is the boolean, with default "false" value
export function useToggle(initialState = false): any {
  const [state, setState] = useState(initialState);

  const toggle: any = useCallback(() => setState(state => !state), []);

  return [state, toggle]
}