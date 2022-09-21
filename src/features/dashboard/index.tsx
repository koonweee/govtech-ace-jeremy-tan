import { styles } from '@/utils/theme';
import { Box, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MatchListView from './components/match-list-view';
import TeamsTableView from './components/teams-table-view';

export default function Dashboard(): JSX.Element {
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Grid item>
        <TeamsTableView />
      </Grid>
      <Grid item>
        <MatchListView />
      </Grid>
    </Grid>
  )
}
