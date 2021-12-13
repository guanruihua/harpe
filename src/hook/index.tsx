
import { useCallback, useState } from 'react';

// Hook
export function useBoolean(initialState = false): any {
  const [state, setState] = useState(initialState);
  const toggle: any = useCallback(() => setState(state => !state), []);
  return [state, toggle]
}