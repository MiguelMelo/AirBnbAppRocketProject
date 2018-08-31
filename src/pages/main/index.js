import React, { Component } from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';

import { Container, 
  AnnotationContainer, 
  AnnotationText, 
  NewButtonContainer, 
  ButtonsWrapper, 
  CancelButtonContainer, 
  SelectButtonContainer, 
  ButtonText,
  Marker } from './styles';
import api from '../../services/api';

MapboxGL.setAccessToken('pk.eyJ1IjoibWlndWVsbWVsbyIsImEiOiJjamxoNGlsNDMxZWd0M3BudXd3b2ZvMzJ1In0.As1CK9BWI49gXPILZxaflA');

export default class Main extends Component {
  state = {
    locations: [],
    newRealty: false,
    cameraModalOpened: false,
    dataModelOpened: false,
    realtyData: {
      location: {
        latitude: null,
        longitude: null,
      },
      name: '',
      price: '',
      address: '',
      images: [],
    },
  };

  static navigationOptions = {
    header: null,
  };

  renderLocations = () => (
    this.state.locations.map(location => (
      <MapboxGL.PointAnnotation
        id={ location.id.toString() }
        coordinate={ [ parseFloat(location.longitude), parseFloat(location.latitude) ] }
      >
        <AnnotationContainer>
          <AnnotationText>{ location.price }</AnnotationText>
        </AnnotationContainer>
        <MapboxGL.Callout title={ location.title } />
      </MapboxGL.PointAnnotation>
    ))
  )

  async componentDidMount() {
    try {
      const response = await api.get('/properties', {
        params: {
          latitude: -27.210768,
          longitude: -49.644018,
        },
      });

      this.setState({ locations: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  renderConditionalsButtons = () => (
    !this.state.newRealty ? (
      <NewButtonContainer onPress={this.handleNewRealtyPress}>
        <ButtonText>Novo imóvel</ButtonText>
      </NewButtonContainer>
    ) : (
      <ButtonsWrapper>
        <SelectButtonContainer onPress={this.handleGetPositionPress}>
          <ButtonText>Selecionar localização</ButtonText>
        </SelectButtonContainer>
        <CancelButtonContainer onPress={this.handleNewRealtyPress}>
          <ButtonText>Cancelar</ButtonText>
        </CancelButtonContainer>
      </ButtonsWrapper>
    )
  )

  handleNewRealtyPress = () => this.setState({ newRealty: !this.state.newRealty });

  handleGetPositionPress = async () => {
    try {
      const [latitude, longitude] = await this.map.getCenter();
      this.setState({
        cameraModalOpened: true,
        realtyData: {
          ...this.state.realtyData,
          location: {
            latitude,
            longitude
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  renderMarker = () => (
    this.state.newRealty &&
    !this.state.cameraModalOpened &&
    <Marker resizeMode="contain" source={require('../../images/marker.png')} />
  )

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <MapboxGL.MapView
          centerCoordinate={[-49.6446024, -27.2108001]}
          style={{ flex: 1 }}
          styleURL={MapboxGL.StyleURL.Dark}
          ref={map => {
            this.map = map;
          }}
        >
          { this.renderLocations() }
        </MapboxGL.MapView>
        { this.renderConditionalsButtons() }
        { this.renderMarker() }
      </Container>
    );
  }
}
