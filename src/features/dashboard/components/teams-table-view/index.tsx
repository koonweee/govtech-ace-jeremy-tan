import { styles } from '@/utils/theme';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

export default function TeamsTableView(): JSX.Element {
  return (
    <Grid
      container
      spacing={4}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Paper elevation={1} className={styles().paper}>
          <div style={{ padding: 40 }}>
            <h1>Group A</h1>
          </div>
        </Paper>
      </Grid>
      <Grid item>
        <Paper elevation={1} className={styles().paper}>
          <div style={{ padding: 40 }}>
            <h1>Group B</h1>
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}
