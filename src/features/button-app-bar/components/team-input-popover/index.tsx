import * as React from 'react';
import InputPopoverWrapper from '@/components/input-popover-wrapper';
import { GenericInputForm } from '@/components/generic-input-form';

const TEAM_FORMAT = '<Team A name> <Team A registration date in DD/MM> <Team A group number> ...'
export default function TeamInputPopover() {
  return (
    <InputPopoverWrapper buttonText={'Enter team(s) information'}>
      <GenericInputForm
        mutation={function (params: any): Promise<any> {
        throw new Error("Function not implemented.")
      } }
        isMutationLoading={false}
        inputFormat={TEAM_FORMAT}
        inputLabel={"Team(s) information"}
        inputHelperText={`Please enter team(s) in the format ${TEAM_FORMAT}`}
        buttonText={"Register team(s)!"}
      />
    </InputPopoverWrapper>
  );
}
