import { trpc } from "@/server/trpc";
import { Button, Popover } from "@material-ui/core";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

export default function DeleteAllPopover(): JSX.Element {
  const trpcContext = trpc.useContext();
  const { mutateAsync: deleteAllMutateAsync, isLoading: isDeleteAllLoading} = trpc.useMutation("deleteAllData", {
    onSuccess: () => {
      trpcContext.invalidateQueries("findAllMatches");
      trpcContext.invalidateQueries("getTeamRankingByGroup");
    }
  });
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button color="secondary" variant="contained" {...bindTrigger(popupState)}>
            Delete all data
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div style={{margin: 20}}>
              <p>Are you sure you want to delete all data?</p>
              <Button
                disabled={isDeleteAllLoading}
                color="secondary"
                variant="contained"
                onClick={async () => {
                  await deleteAllMutateAsync();
                  popupState.close();
                }}>
                Delete all data
              </Button>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
