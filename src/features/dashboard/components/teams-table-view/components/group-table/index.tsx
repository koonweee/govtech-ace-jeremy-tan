import { CircularProgress, Paper } from "@material-ui/core";
import { ResultSummary } from "../../types";
import TeamTable from "./components/team-table";

interface Props {
  groupNumber: number;
  isDataLoading: boolean;
  data?: ResultSummary[];
}

export default function GroupTable({ groupNumber, isDataLoading, data }: Props): JSX.Element {
  return (
    <Paper elevation={1}>
      {isDataLoading || !data ? (<CircularProgress/>) : (
        <TeamTable groupNumber={groupNumber} data={data} />
      )}
    </Paper>
  );
}
