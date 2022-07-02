import { Fade } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { ComponentType, ReactElement, useState } from 'react';

type Alert = {
  open: boolean;
  Transition: ComponentType<
    TransitionProps & {
      children: ReactElement<any, any>;
    }
  >
};

export default function useAlert() {
  const [state, setState] = useState<Alert>({
    open: false,
    Transition: Fade
  });

  const handleClose = () => {
    setState({
      ...state,
      open: false
    });
  };

  const handleOpen = () => {
    setState({
      ...state,
      open: true
    });
  };

  return { state, handleOpen, handleClose };
}
