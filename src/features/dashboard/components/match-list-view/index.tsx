import { trpc } from '@/server/trpc';
import { CircularProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MatchTable from './components/match-table';

export default function MatchListView(): JSX.Element {
  const { data: matchData, isLoading: isMatchDataLoading} = trpc.useQuery(["findAllMatches"]);
  return (
    <div>
    {isMatchDataLoading || !matchData ? (<CircularProgress/>) : (
      <MatchTable data={matchData} />
    )}
    </div>
  )
}
