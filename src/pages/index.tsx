import { CssBaseline, Grid } from '@material-ui/core';
import ButtonAppBar from '@/features/button-app-bar';
import Dashboard from '@/features/dashboard';
import { trpc } from '@/server/trpc';

export default function Home(): JSX.Element {
  const { data: teamNameMapData, isLoading: isTeamNameMapLoading } = trpc.useQuery(["getAllTeamsByNames"]);
  return (
    <div>
      <CssBaseline />
      {!isTeamNameMapLoading && <ButtonAppBar teamNameMap={teamNameMapData!}/>}
      <div>
        <Dashboard />
      </div>
    </div>
  )
}
