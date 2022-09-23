import * as React from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { PopupState as PopupStateType } from 'material-ui-popup-state/core';

interface Props {
  buttonText: string;
  children: (popupState: PopupStateType) => JSX.Element;
}

export default function InputPopoverWrapper({ buttonText, children }: Props): JSX.Element {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button color="primary" variant="contained" {...bindTrigger(popupState)}>
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
            {children(popupState)}
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
