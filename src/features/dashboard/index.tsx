import { Grid } from '@material-ui/core';
import MatchListView from './components/match-list-view';
import TeamsTableView from './components/teams-table-view';

export default function Dashboard(): JSX.Element {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignContent='center'
      style={{ padding: 20 }}
    >
      <Grid item xs={12}>
        <TeamsTableView />
      </Grid>
      <Grid item>
        <MatchListView />
      </Grid>
    </Grid>
  )
}
