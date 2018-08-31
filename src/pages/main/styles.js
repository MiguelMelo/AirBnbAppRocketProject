import styled from 'styled-components';
import { Dimensions } from 'react-native';

const Container = styled.View`
    flex: 1;
`;

const AnnotationContainer = styled.View`
    alignItems: center;
    justifyContent: center;
    backgroundColor: #FC6663;
    borderRadius: 5px;
    padding: 5px;
`;

const AnnotationText = styled.Text`
    fontSize: 14px;
    color: #FFF;
`;

const NewButtonContainer = styled.TouchableHighlight`
  position: absolute;
  bottom: 54;
  left: 20;
  right: 20;
  alignSelf: center;
  borderRadius: 5px;
  paddingVertical: 20px;
  backgroundColor: #fc6663;
`;

const ButtonsWrapper = styled.View`
  position: absolute;
  bottom: 54;
  left: 20;
  right: 20;
`;

const CancelButtonContainer = styled.TouchableHighlight`
  alignSelf: stretch;
  borderRadius: 5px;
  paddingVertical: 20px;
  backgroundColor: #555;
  marginTop: 20px;
`;

const SelectButtonContainer = styled.TouchableHighlight`
  alignSelf: stretch;
  borderRadius: 5px;
  paddingVertical: 20px;
  backgroundColor: #fc6663;
`;

const ButtonText = styled.Text`
  color: #fff;
  fontSize: 16px;
  textAlign: center;
  fontWeight: bold;
`;

const Marker = styled.Image`
  width: 60px;
  height: 60px;
  position: absolute;
  alignSelf: center;
  top: ${(Dimensions.get('window').height / 2) - 60};
`;

export { Container, 
    AnnotationContainer, 
    AnnotationText, 
    NewButtonContainer, 
    ButtonsWrapper, 
    CancelButtonContainer, 
    SelectButtonContainer, 
    ButtonText,
    Marker };