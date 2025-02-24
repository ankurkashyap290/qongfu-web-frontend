import React, { useEffect, useRef, FunctionComponent, useState } from "react";
import { Input, FormHelperText } from "@material-ui/core";
import useStyles from "../../Styles/components/searchLocation";

let autoComplete;
interface Props {
  placeholder: string;
  onSelect: Function;
  value: string;
  hasError: boolean;
  errorText?: string;
  onListItemSelect?: Function;
  containerClass?: string;
  searchInputClass?: string;
  inputRootClass?: string;
}
const SearchLocationInput: FunctionComponent<Props> = ({
  placeholder,
  onSelect,
  value,
  hasError,
  errorText = "",
  onListItemSelect,
  containerClass,
  searchInputClass,
  inputRootClass,
}) => {
  const [isGoogleApiLoaded, setGoogleApiLoaded] = useState(false);
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    if (!isGoogleApiLoaded) {
      //@ts-ignore
      if (typeof window.google !== "undefined" && typeof window.google.maps !== "undefined") {
        console.log("Loaded Google Map Places API");
        setGoogleApiLoaded(true);
        handleScriptLoad();
      }
    }
  });

  async function handlePlaceSelect() {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    onSelect(query);
    onListItemSelect && onListItemSelect(addressObject);
  }

  const handleScriptLoad = () => {
    //@ts-ignore
    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current);
    // {
    //   types: ["(cities)"],
    // }
    // autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () => handlePlaceSelect());
  };

  const classes = useStyles();

  return (
    <div className={classes[containerClass || "searchContainer"]}>
      <Input
        name="profile-location"
        autoComplete="nope"
        inputRef={autoCompleteRef}
        onChange={event => onSelect(event.target.value)}
        value={value}
        classes={{
          input: classes[searchInputClass || "searchInput"],
          root: classes[inputRootClass || "inputWidth"],
        }}
        disableUnderline
        placeholder={placeholder}
        type="text"
      />
      {!hasError ? null : (
        <FormHelperText className={classes.errorText}>
          {errorText ? errorText : "* Required field"}
        </FormHelperText>
      )}
    </div>
  );
};

export default SearchLocationInput;
