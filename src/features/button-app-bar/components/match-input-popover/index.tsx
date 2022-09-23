import * as React from 'react';
import InputPopoverWrapper from '@/components/input-popover-wrapper';
import { GenericInputForm } from '@/components/generic-input-form';
import { trpc } from '@/server/trpc';
import { formatMatchMutationInput, validateMatchInput } from './util';
import { Team } from '@prisma/client';
import { PopupState } from 'material-ui-popup-state/core';

const MATCH_FORMAT = '<Team A name> <Team B name> <Team A goals scored> <Team B goals scored> ...'
interface Props {
  teamNameMap: Map<string, Team>;
}

export default function MatchInputPopover({ teamNameMap }: Props) {
  const trpcContext = trpc.useContext();
  const { mutateAsync: addMatchesMutateAsync, isLoading: isAddMatchesLoading} = trpc.useMutation("addMatches", {
    onSuccess: () => {
      trpcContext.invalidateQueries("findAllMatches");
      trpcContext.invalidateQueries("getTeamRankingByGroup");
    }
  });
  return (
    <InputPopoverWrapper buttonText={'Enter match(es)'}>
      {(popupState: PopupState) =>
      <GenericInputForm
        mutation={addMatchesMutateAsync}
        isMutationLoading={isAddMatchesLoading}
        inputFormat={MATCH_FORMAT}
        inputLabel={"Match(es)"}
        inputHelperText={`Please enter match(es) in the format ${MATCH_FORMAT}`}
        inputValidator={validateMatchInput(teamNameMap)}
        mutationInputFormatter={formatMatchMutationInput}
        buttonText={"Submit match(es)!"}
        popupState={popupState}
      />
    }
    </InputPopoverWrapper>
  );
}
