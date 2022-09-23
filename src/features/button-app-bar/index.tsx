import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TeamInputPopover from './components/team-input-popover';
import MatchInputPopover from './components/match-input-popover';
import { Team } from '@prisma/client';
import DeleteAllPopover from './components/delete-all-popover';

interface Props {
  teamNameMap: Map<string, Team>;
}

export default function ButtonAppBar({ teamNameMap }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div style={{ marginRight: "1rem"}}>
            <TeamInputPopover teamNameMap={teamNameMap}/>
          </div>
          <MatchInputPopover teamNameMap={teamNameMap}/>
          <div style={{ marginLeft: "auto" }}>
            <DeleteAllPopover />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
