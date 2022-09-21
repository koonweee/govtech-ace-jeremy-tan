import * as React from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

interface Props {
  buttonText: string;
  children: JSX.Element;
}

export default function InputPopoverWrapper({ buttonText, children }: Props): JSX.Element {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button color="secondary" variant="contained" {...bindTrigger(popupState)}>
            {buttonText}
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div style={{margin: 20}}>
            {children}
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
