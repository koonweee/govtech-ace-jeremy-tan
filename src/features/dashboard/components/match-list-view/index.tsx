import { styles } from '@/utils/theme';
import Paper from '@material-ui/core/Paper';

export default function MatchListView(): JSX.Element {
  return (
    <Paper elevation={1} className={styles().paper}>
      <div style={{ padding: 40 }}>
        <h1>Matches played</h1>
      </div>
    </Paper>
  )
}
