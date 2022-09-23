import { trpc } from '@/server/trpc';
import { Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import GroupTable from './components/group-table';

export default function TeamsTableView(): JSX.Element {
  const { data: group1Data, isLoading: isGroup1Loading} = trpc.useQuery(["getTeamRankingByGroup", { groupNumber: 1 }]);
  const { data: group2Data, isLoading: isGroup2Loading} = trpc.useQuery(["getTeamRankingByGroup", { groupNumber: 2 }]);
  return (
    <>
      <Typography variant='h6' style={{padding: 20}} align={'center'}>
        Groups
      </Typography>
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <GroupTable groupNumber={1} isDataLoading={isGroup1Loading} data={group1Data} />
        </Grid>
        <Grid item>
          <GroupTable groupNumber={2} isDataLoading={isGroup2Loading} data={group2Data} />
        </Grid>
      </Grid>
    </>
  )
}
