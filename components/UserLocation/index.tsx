import React, { FunctionComponent, useState } from "react";
import GoogleMapReact from "google-map-react";
import { IconButton } from "@material-ui/core";
import { Map_Key } from "../../config";
import SearchLocationInput from "./searchLocation";
import MyLocationIcon from "@material-ui/icons/MyLocation";

interface Props {
  height: string;
  coordinates: any;
  zoom: number;
  onLocationChange: Function;
  searchAddress?: string;
  isLocateMe: boolean;
  isMobile: boolean;
  setIsLocationChange: Function;
  userCurrentPin: any;
}

function defaultMapOptions() {
  return {
    fullscreenControl: false,
    zoomControl: false,
  };
}

var _map;
var _maps;
var _marker;
// let _searchBox = null;

const UserLocation: FunctionComponent<Props> = props => {
  const {
    height,
    coordinates,
    zoom,
    onLocationChange,
    // isLocateMe,
    // isMobile,
    setIsLocationChange,
    userCurrentPin,
  } = props;
  const [isDragStart, setDragStart] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  // const [selectedCountry, setCountry] = useState("");
  let centerCoords = { lat: parseFloat(userCurrentPin.lat), lng: parseFloat(userCurrentPin.lng) };
  if (coordinates.lat && coordinates.lng) {
    centerCoords = { lat: parseFloat(coordinates.lat), lng: parseFloat(coordinates.lng) };
  }

  // useEffect(() => {
  //   if (selectedCountry !== country) {
  //     setCountry("BH");
  //     if (_map && _maps && _searchBox) {
  //       //@ts-ignore
  //       _searchBox && _searchBox.setComponentRestrictions({ country: [country] });
  //       const input = inputEl.current;
  //       //@ts-ignore
  //       input.value = "";
  //     }
  //   }
  // }, [selectedCountry, country]);

  const onLoad = (map, maps) => {
    _map = map;
    _maps = maps;

    // profile has filled already then only load marker at start
    if (coordinates.lat && coordinates.lng) {
      _initMarker(centerCoords);
    }

    // if (inputEl !== null) {
    //   const input = inputEl.current;
    //   _searchBox = new _maps.places.Autocomplete(input);
    //   //@ts-ignore
    //   // _searchBox.setComponentRestrictions({ country: [country] });
    //   _map.controls[_maps.ControlPosition.TOP_CENTER].push(input);
    //   //@ts-ignore
    //   _searchBox.addListener("place_changed", handleOnSearchLocation);
    // }
  };

  const toggleBounce = () => {
    if (_marker.getAnimation() !== null) {
      _marker.setAnimation(null);
    } else {
      _marker.setAnimation(_maps.Animation.BOUNCE);
    }
  };

  const _initMarker = coordinates => {
    _marker = new _maps.Marker({
      map: _map,
      draggable: true,
      animation: _maps.Animation.DROP,
      position: { lat: coordinates.lat, lng: coordinates.lng },
    });
    _marker.addListener("click", toggleBounce);
    _maps.event.addListener(_marker, "dragstart", onMarkerDragStart);
    _maps.event.addListener(_marker, "dragend", onMarkerDragEnd);
  };

  const onChange = ({ center }) => {
    if (center.lat) {
      if (_maps && !isDragStart) {
        _marker.setMap(null);
        _initMarker(center);
        onMarkerDragEnd(null, center);
      }
    }
  };

  const onMarkerDragEnd = (evt, center) => {
    const lat = evt ? evt.latLng.lat() : center.lat;
    const lng = evt ? evt.latLng.lng() : center.lng;
    setDragStart(false);
    const geocoder = new _maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, function(results, status) {
      if (status === "OK") {
        if (results[0]) {
          //location = <area>, <city or province>, <region>, </country>
          const addressComponents = [...results[0].address_components];
          const country = addressComponents.find(item => item.types.includes("country")).short_name;
          const area = addressComponents
            .filter(
              item =>
                item.types.filter(type => ["sublocality"].includes(type)).length > 0 &&
                !item.types.includes("country")
            )
            .map(item => item.long_name)
            .join(", ");

          const city = addressComponents
            .filter(
              item =>
                item.types.filter(type => ["locality"].includes(type)).length > 0 &&
                !item.types.includes("country")
            )
            .map(item => item.long_name)
            .join(", ");

          const region = addressComponents
            .filter(
              item =>
                item.types.filter(type => ["administrative_area_level_1"].includes(type)).length >
                  0 && !item.types.includes("country")
            )
            .map(item => item.long_name)
            .join(", ");

          const address = results[0].formatted_address;

          onLocationChange({
            lat: parseFloat(lat.toFixed(8)),
            lng: parseFloat(lng.toFixed(8)),
            area,
            city,
            address,
            country,
            region,
          });
          setIsLocationChange(true);
        }
      }
    });
  };
  const onMarkerDragStart = () => {
    if (!isDragStart) {
      setDragStart(true);
    }
  };
  // const handleOnSearchLocation = () => {
  //   //@ts-ignore
  //   const place = _searchBox.getPlace();
  //   console.log("searched places", place);
  //   if (place.geometry) {
  //     const location = place.geometry.location;
  //     _marker && _marker.setMap(null);
  //     _initMarker({ lat: location.lat(), lng: location.lng() });
  //     if (place.geometry.viewport) {
  //       // Only geocodes have viewport.
  //       _map.fitBounds(place.geometry.viewport);
  //     } else {
  //       _map.setCenter(place.geometry.location);
  //     }
  //   }
  //   setIsLocationChange(true);
  // };

  const handleOnSearchPlaceSelected = place => {
    if (place.geometry) {
      const location = place.geometry.location;
      const center = { lat: location.lat(), lng: location.lng() };
      _marker && _marker.setMap(null);
      _initMarker(center);
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        _map.fitBounds(place.geometry.viewport);
      } else {
        _map.setCenter(place.geometry.location);
      }
      onMarkerDragEnd(null, center);
    }
  };

  const handleSetCurrentLocation = () => {
    _marker && _marker.setMap(null);
    const center = { lat: parseFloat(userCurrentPin.lat), lng: parseFloat(userCurrentPin.lng) };
    _initMarker(center);
    _map.setCenter(center);
    _map.setZoom(zoom);
    onMarkerDragEnd(null, center);
    setSearchPhrase("");
  };

  return (
    <div style={{ height, width: "100%" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "50px",
          width: "100%",
          zIndex: 1,
        }}
      >
        <SearchLocationInput
          containerClass="placeSearchCt"
          searchInputClass="placeSearchInput"
          inputRootClass="placeRootCt"
          placeholder="Search your location"
          onSelect={value => {
            setSearchPhrase(value);
          }}
          onListItemSelect={place => {
            handleOnSearchPlaceSelected(place);
          }}
          value={searchPhrase}
          hasError={false}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 1,
        }}
      >
        <IconButton onClick={handleSetCurrentLocation} style={{ backgroundColor: "#fff" }}>
          <MyLocationIcon />
        </IconButton>
      </div>

      <GoogleMapReact
        bootstrapURLKeys={{ key: Map_Key }}
        center={centerCoords}
        zoom={zoom}
        onChange={onChange}
        onGoogleApiLoaded={({ map, maps }) => onLoad(map, maps)}
        options={defaultMapOptions()}
      />
    </div>
  );
};

export default UserLocation;
