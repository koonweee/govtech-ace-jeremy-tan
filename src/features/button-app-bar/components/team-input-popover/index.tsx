import * as React from 'react';
import InputPopoverWrapper from '@/components/input-popover-wrapper';
import { GenericInputForm } from '@/components/generic-input-form';
import { trpc } from '@/server/trpc';
import { formatTeamMutationInput, validateTeamInput } from './util';
import { Team } from '@prisma/client';
import { PopupState } from 'material-ui-popup-state/core';

const TEAM_FORMAT = '<Team A name> <Team A registration date in DD/MM> <Team A group number> ...'
interface Props {
  teamNameMap: Map<string, Team>;
}

export default function TeamInputPopover({ teamNameMap }: Props) {
  const trpcContext = trpc.useContext();
  const { mutateAsync: addTeamsMutateAsync, isLoading: isAddTeamsLoading} = trpc.useMutation("addTeams", {
    onSuccess: () => {
      trpcContext.invalidateQueries("getTeamRankingByGroup");
      trpcContext.invalidateQueries("getAllTeamsByNames");
    }
  });
  return (
    <InputPopoverWrapper buttonText={'Enter team(s) information'}>
      {(popupState: PopupState) =>
        <GenericInputForm
        mutation={addTeamsMutateAsync}
        isMutationLoading={isAddTeamsLoading}
        inputFormat={TEAM_FORMAT}
        inputLabel={"Team(s) information"}
        inputHelperText={`Please enter team(s) in the format ${TEAM_FORMAT}`}
        inputValidator={validateTeamInput(teamNameMap)}
        mutationInputFormatter={formatTeamMutationInput}
        buttonText={"Register team(s)!"}
        popupState={popupState}
      />
      }
    </InputPopoverWrapper>
  );
}
