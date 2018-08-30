import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import api from '../../services/api';
import {
  Container,
  Logo,
  SuccessMessage,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
  SignInLink,
  SignInLinkText,
} from './styles';

export default class SingUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    error: '',
    success: ''
  };

  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };

  handleUsernameChange = (username) => {
    this.setState({ username });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleBackToLoginPress = () => {
    this.props.navigation.goBack();
  };

  handleSingUpPress = async () => {
    if(this.state.username.length === 0 ||this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
    } else {
      try {
        await api.post('/users', {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        });

        this.setState({ success: 'Conta criada com sucesso! Redirecionando para o login...', error: '' });

        setTimeout(this.goToLogin, 2500);
      } catch (err) {
        this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });
      }
    }
  };

  goToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SingIn' }),
      ],
    });

    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Logo source={require('../../images/airbnb-logo.png')} resizeMode="contain" />
        { this.state.success.length !== 0 && <SuccessMessage>{ this.state.success }</SuccessMessage> }
        <Input
          placeholder="Nome de usuário"
          value={ this.state.username }
          onChangeText={ this.handleUsernameChange }
          underlineColorAndroid="#FFF"
          autoCapitalize="none"
          autoCorrect={ false }
        />
        <Input
          placeholder="Endereço de e-mail"
          value={ this.state.email }
          onChangeText={ this.handleEmailChange }
          underlineColorAndroid="#FFF"
          autoCapitalize="none"
          autoCorrect={ false }
        />
        <Input
          placeholder="Senha"
          value={ this.state.password }
          onChangeText={ this.handlePasswordChange }
          underlineColorAndroid="#FFF"
          autoCapitalize="none"
          autoCorrect={ false }
          secureTextEntry
        />
        { this.state.error.length !== 0 && <ErrorMessage>{ this.state.error }</ErrorMessage> }
        <Button onPress={this.handleSingUpPress}>
          <ButtonText>Criar conta</ButtonText>
        </Button>
        <SignInLink onPress={this.handleBackToLoginPress}>
          <SignInLinkText>Voltar ao login</SignInLinkText>
        </SignInLink>
      </Container>
    );
  }
}

