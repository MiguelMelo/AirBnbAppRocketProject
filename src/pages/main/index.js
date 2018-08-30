import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken('pk.eyJ1IjoibWlndWVsbWVsbyIsImEiOiJjamxoNGlsNDMxZWd0M3BudXd3b2ZvMzJ1In0.As1CK9BWI49gXPILZxaflA');

const Main = () => (
  <MapboxGL.MapView
    centerCoordinate={[-49.6446024, -27.2108001]}
    style={{ flex: 1 }}
    styleURL={MapboxGL.StyleURL.Dark}
  />
);

export default Main;
