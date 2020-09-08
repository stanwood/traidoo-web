import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Autocomplete from "@material-ui/lab/Autocomplete";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { PlaceType } from "../../../../core/interfaces/routes/maps";
import usePlacesFieldStyles from "./styles";

const autocompleteService = { current: null };

interface PlacesFieldProps {
  fieldName: string;
  label: string;
}

const PlacesField: React.FC<PlacesFieldProps> = (props: PlacesFieldProps) => {
  const classes = usePlacesFieldStyles();

  const { fieldName, label } = props;
  const { control, errors } = useFormContext();

  const [value, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<PlaceType[]>([]);

  const fetch = React.useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          );
        },
        200
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: PlaceType[]) => {
      if (active) {
        let newOptions = [] as PlaceType[];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Controller
      render={(props) => (
        <Autocomplete
          {...props}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.description
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          renderOption={(option) => {
            const matches =
              option.structured_formatting.main_text_matched_substrings;
            const parts = parse(
              option.structured_formatting.main_text,
              matches.map((match: any) => [
                match.offset,
                match.offset + match.length,
              ])
            );

            return (
              <Grid container alignItems="center">
                <Grid item>
                  <LocationOnIcon className={classes.icon} />
                </Grid>
                <Grid item xs>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{ fontWeight: part.highlight ? 700 : 400 }}
                    >
                      {part.text}
                    </span>
                  ))}
                  <Typography variant="body2" color="textSecondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              error={errors[fieldName] ? true : false}
              helperText={errors[fieldName] ? errors[fieldName].message : ""}
            />
          )}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onChange={(_, data) => props.onChange(data.description)}
        />
      )}
      name={fieldName}
      control={control}
    />
  );
};

export default PlacesField;
