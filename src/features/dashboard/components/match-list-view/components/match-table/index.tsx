import * as React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Match } from '../../types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { trpc } from '@/server/trpc';

interface Props {
  data: Match[];
}

const columns: GridColDef[] = [
  { field: 'homeTeamName', headerName: 'Home Team', flex: 1},
  { field: 'awayTeamName', headerName: 'Away Team', flex: 1},
  { field: 'homeTeamGoals', headerName: 'Home Team Goals', flex: 1},
  { field: 'awayTeamGoals', headerName: 'Away Team Goals', flex: 1},
];

export default function MatchTable({ data }: Props): JSX.Element {
  const trpcContext = trpc.useContext();
  const { mutateAsync: deleteMatchesMutateAsync, isLoading: isDeleteMatchesLoading} = trpc.useMutation("removeMatches", {
    onSuccess: () => {
      trpcContext.invalidateQueries("findAllMatches");
      trpcContext.invalidateQueries("getTeamRankingByGroup");
    }
  });
  const [selectedMatchIds, setSelectedMatchIds] = React.useState<number[]>([]);
  const handleDeleteMatches = async () => {
    await deleteMatchesMutateAsync(selectedMatchIds);
    setSelectedMatchIds([]);
  }
  return (
    <div style={{height: 500, width: 1000 }}>
      <Typography variant='h6' style={{padding: 20}} align={'center'}>
        Matches played
      </Typography>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          setSelectedMatchIds(newSelectionModel.map((id) => Number(id)));

        }}
      />
      <Button disabled={selectedMatchIds.length === 0 || isDeleteMatchesLoading} variant={'outlined'} style={{marginTop: 10}} onClick={handleDeleteMatches}>
        Delete selected matches
      </Button>
    </div>
  );
}
