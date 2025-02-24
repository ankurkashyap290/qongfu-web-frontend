import React, { FunctionComponent, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import { Location, Places } from "../../redux/actionTypes";
import { Map_Key } from "../../config";
import SimpleMarker from "./SimpleMarker";
import ClusterMarker from "./ClusterMarker";
import { getDistance } from "../../utils";

// declare let google;
interface Props {
  mapProps?: {
    center: Location;
    zoom: number;
    bounds: any;
  };
  height: string;
  options?: { minZoom: number; maxZoom: number };
  markers: Places[];
  clusterRadius?: number;
  children?(data: {
    id: string;
    numPoints: number;
    lat: number;
    lng: number;
    onMarkerClick: Function;
    onClusterClick: Function;
    mid: string;
    showtitle: boolean;
    store: object;
    points: [];
  }): void; //
  setActiveItemIndex?: Function;
  onMapChange?: Function;
}

function defaultMapOptions() {
  return {
    fullscreenControl: false,
    zoomControl: false,
  };
}

var _map;
const Map: FunctionComponent<Props> = props => {
  const { mapProps, markers, height, setActiveItemIndex, onMapChange } = props;
  const [theMapProps, setTheMapProps] = useState({ ...mapProps });
  const [bounds, setBounds] = useState(null);

  const onLoad = map => {
    _map = map;
  };

  const onChange = ({ center, zoom, bounds }) => {
    setTheMapProps({ center, zoom, bounds });
    //@ts-ignore
    setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
    const distance = getDistance(bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat);
    onMapChange && onMapChange({ center, distance });
  };

  useEffect(() => {
    setTheMapProps({ ...mapProps });
  }, [mapProps]);

  const points = markers.map(item => {
    return {
      type: "place",
      properties: { cluster: false, placeId: item.id, place: item },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(item.location_lng), parseFloat(item.location_lat)],
      },
    };
  });

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: bounds,
    //@ts-ignore
    zoom: theMapProps.zoom,
    options: { radius: 150, maxZoom: 20 },
  });

  const handleClusterMarkerClick = (id, latitude, longitude) => {
    const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(id), 20);
    _map.setZoom(expansionZoom);
    _map.panTo({ lat: latitude, lng: longitude });
  };

  return (
    <div style={{ height, width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: Map_Key }}
        //@ts-ignore
        center={theMapProps.center}
        //@ts-ignore
        zoom={theMapProps.zoom}
        onChange={onChange}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => onLoad(map)}
        options={defaultMapOptions()}
      >
        {clusters.length &&
          clusters.map(cluster => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, place, placeId, point_count } = cluster.properties;
            if (isCluster) {
              return (
                <ClusterMarker
                  key={`cluster-${cluster.id}`}
                  lat={latitude}
                  lng={longitude}
                  place={place}
                  onMarkerClick={() => handleClusterMarkerClick(cluster.id, latitude, longitude)}
                  clusterLength={point_count}
                />
              );
            } else {
              return (
                <SimpleMarker
                  lat={latitude}
                  lng={longitude}
                  key={`${latitude}-${placeId}`}
                  place={place}
                  onMarkerClick={setActiveItemIndex}
                />
              );
            }
          })}
      </GoogleMapReact>
    </div>
  );
};

Map.defaultProps = {
  mapProps: {
    center: { lat: 26.2030679, lng: 50.5430425 },
    zoom: 12, //11,
    bounds: null,
  },
  options: {
    minZoom: 3,
    maxZoom: 15,
  },
  clusterRadius: 60,
  markers: [],
} as Partial<Props>;

export default Map;
