import { TextField, Button, CircularProgress, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";

interface Props {
  onSubmit?: (value: string) => void;
  mutation: (params: any) => Promise<any>;
  isMutationLoading: boolean;
  inputFormat: string;
  inputLabel: string;
  inputHelperText: string;
  buttonText: string;
}

interface FormValues {
  input?: string;
}

export function GenericInputForm({ onSubmit, mutation, isMutationLoading, inputFormat, inputLabel, inputHelperText, buttonText }: Props): JSX.Element {
  return (
    <Formik<FormValues>
      initialValues={{
        input: "",
      }}
      onSubmit={(values) => {
        // call mutation to add teams
        mutation({url: values.input!});
        onSubmit &&onSubmit("placeholder");
      }}
      validationSchema={Yup.object({
        input: Yup.string().required(inputHelperText),
      })}
    >
      {({ values, handleChange, handleSubmit, touched, errors, isValid }) => (
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
            onChange={handleChange}
            error={touched.input && Boolean(errors.input)}
            helperText={touched.input && errors.input}
            variant="outlined"
            multiline
            minRows={4}
            style={{ marginBottom: "1rem" }}
          />
          {
            isMutationLoading ? (
              <CircularProgress style={{ marginLeft: "auto", marginRight: "auto"}}/>
            ) : (
              <Button color="primary" variant="outlined" fullWidth type="submit" disabled={!isValid || isMutationLoading}>
                {buttonText}
              </Button>
            )
          }
        </form>
      )}
    </Formik>
  );
}
