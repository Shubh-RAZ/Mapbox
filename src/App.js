import * as React from 'react';
import {useState, useCallback} from 'react';
import {render} from 'react-dom';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import './App.css'
import ControlPanel from './control-panel';
import Pin from './pin';
import useGeolocation from './Geolocation';



const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

function App() {

  const location = useGeolocation()

  const [viewport, setViewport] = useState({
    latitude: location.loaded ? (location.coord.lat) : 25.5941,
    longitude: location.loaded ? location.coord.long : 85.1376,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
    height:'90vh',
    width:'100vw'
  });

  // console.log(viewport.latitude)
  // console.log(viewport.longitude)
  const [marker, setMarker] = useState({
    latitude: location.loaded ? (location.coord.lat) : 25.5941,
    longitude: location.loaded ? location.coord.long : 85.1376,


  });
  const [events, logEvents] = useState({});

  const onMarkerDragStart = useCallback(event => {
    logEvents(_events => ({..._events, onDragStart: event.lngLat}));
  }, []);

  const onMarkerDrag = useCallback(event => {
    logEvents(_events => ({..._events, onDrag: event.lngLat}));
  }, []);

  const onMarkerDragEnd = useCallback(event => {
    logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1]
    });
  }, []);
  return (
    <div className="App">
      <ReactMapGL 
      {...viewport} 
      onViewportChange={(newview) => setViewport(newview)}
      mapboxApiAccessToken={"pk.eyJ1IjoiY2UxOWIwMzAiLCJhIjoiY2twNDA0a28wMDlqaTMybHJzcjJsODV5NCJ9.TqYUNaeCPJgguJgZUBM5_g"}
      mapStyle="mapbox://styles/ce19b030/ckp42nasm0gxl18ojtkjnlsoz"
    
      >

<Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={20} />
        </Marker>

        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
        </ReactMapGL>
        <div className="btm-whole"><div className="btn-done">Done</div></div>

    </div>
  );
}

export default App;
