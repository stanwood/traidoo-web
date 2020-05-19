import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Autocomplete from "@material-ui/lab/Autocomplete";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import React, { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { PlaceType } from "../interfaces";
import usePlacesFieldStyles from "./styles";

const autocompleteService = { current: null };

const PlacesField = ({
  fieldName,
  onChange,
  label,
  errors,
  control,
  register,
  defaultValue,
}: {
  fieldName: string;
  onChange?: any;
  label: any;
  errors?: any;
  control: any;
  register?: any;
  defaultValue?: string;
}) => {
  const classes = usePlacesFieldStyles();

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<PlaceType[]>([]);
  const [value, setValue] = React.useState<PlaceType | null | string>(null);

  const fetch = useMemo(
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

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions([]);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: PlaceType[]) => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  return (
    <Autocomplete
      fullWidth
      getOptionSelected={(option, value) => {
        return option.description === value.description;
      }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        onChange(fieldName, newValue?.description);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <Controller
          as={TextField}
          {...params}
          label={label}
          variant="outlined"
          name={fieldName}
          inputRef={register}
          fullWidth
          control={control}
          error={errors ? true : false}
          helperText={errors ? errors.message : ""}
        />
      )}
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
    />
  );
};

export default PlacesField;
