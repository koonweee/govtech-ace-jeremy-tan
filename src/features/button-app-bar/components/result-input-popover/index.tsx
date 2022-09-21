import * as React from 'react';
import InputPopoverWrapper from '@/components/input-popover-wrapper';
import { GenericInputForm } from '@/components/generic-input-form';

const RESULT_FORMAT = '<Team A name> <Team B name> <Team A goals scored> <Team B goals scored> ...'
export default function ResultInputPopover() {
  return (
    <InputPopoverWrapper buttonText={'Enter result(s)'}>
      <GenericInputForm
        mutation={function (params: any): Promise<any> {
        throw new Error("Function not implemented.")
      } }
        isMutationLoading={false}
        inputFormat={RESULT_FORMAT}
        inputLabel={"Result(s)"}
        inputHelperText={`Please enter result(s) in the format ${RESULT_FORMAT}`}
        buttonText={"Submit result(s)!"}
      />
    </InputPopoverWrapper>
  );
}
