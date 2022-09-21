import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TeamInputPopover from './components/team-input-popover';
import ResultInputPopover from './components/result-input-popover';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div style={{ marginRight: "1rem"}}>
            <TeamInputPopover />
          </div>
          <ResultInputPopover />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
