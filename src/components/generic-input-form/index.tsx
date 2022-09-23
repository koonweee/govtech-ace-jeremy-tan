import { TextField, Button, CircularProgress, Typography } from "@material-ui/core";
import { Formik } from "formik";
import { PopupState } from "material-ui-popup-state/core";
import React from "react";
import * as Yup from "yup";

interface Props {
  onSubmit?: (value: string) => void;
  mutation: (params: any) => Promise<any>;
  isMutationLoading: boolean;
  inputFormat: string;
  inputLabel: string;
  inputHelperText: string;
  inputValidator: (input: string) => string[];
  mutationInputFormatter: (input: string) => any;
  buttonText: string;
  popupState: PopupState;
}

interface FormValues {
  input?: string;
}

export function GenericInputForm({ inputValidator, onSubmit, mutation, isMutationLoading, inputFormat, inputLabel, inputHelperText, buttonText, mutationInputFormatter, popupState }: Props): JSX.Element {
  const [inputErrors, setInputErrors] = React.useState<string[]>([]);
  return (
    <Formik<FormValues>
      initialValues={{
        input: "",
      }}
      onSubmit={(values) => {
        // call mutation to add teams
        mutation(mutationInputFormatter(values.input!));
        onSubmit && onSubmit("placeholder");
        popupState.close();
      }}
      validationSchema={Yup.object({
        input: Yup.string().required(inputHelperText),
      })}
    >
      {({ values, handleChange, handleSubmit, touched, errors, isValid, setTouched }) => (
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">
          {inputLabel}
          </Typography>
          <Typography variant="caption">
          {inputHelperText}
          </Typography>
          <TextField
            fullWidth
            id="input"
            name="input"
            label={`Enter ${inputLabel}`}
            placeholder={inputFormat}
            value={values.input}
            onChange={(value) => {
              handleChange(value);
              setInputErrors(inputValidator(value.target.value));
              setTouched({ input: true });
            }}
            error={touched.input && (Boolean(errors.input) || inputErrors.length > 0)}
            helperText={touched.input && (errors.input || inputErrors.join(", "))}
            variant="outlined"
            multiline
            minRows={4}
            style={{ marginBottom: "1rem" }}
          />
          {
            isMutationLoading ? (
              <CircularProgress style={{ marginLeft: "auto", marginRight: "auto"}}/>
            ) : (
              <Button color="primary" variant="outlined" fullWidth type="submit" disabled={!isValid || isMutationLoading || inputErrors.length > 0}>
                {buttonText}
              </Button>
            )
          }
        </form>
      )}
    </Formik>
  );
}
