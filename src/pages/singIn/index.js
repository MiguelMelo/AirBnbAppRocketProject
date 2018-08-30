import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import api from '../../services/api';

import {
    Container,
    Logo,
    Input,
    ErrorMessage,
    Button,
    ButtonText,
    SignUpLink,
    SignUpLinkText,
} from './styles';

export default class SingIn extends Component {
    state = {
        email: '',
        password: '',
        error: '',
    }

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
        }).isRequired,
    };

    static navigationOptions = {
        header: null,
    };

    handleEmailChange = (email) => {
        this.setState({ email, error: '' });
    };

    handlePasswordChange = (password) => {
        this.setState({ password, error: '' });
    };

    handleCreateAccountPress = () => {
        this.props.navigation.navigate('SingUp');
    };

    handleSingInPress = async () => {
        if (this.state.email.length === 0 || this.state.password.length === 0) {
            this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
        } else {
            try {
                const response = await api.post('/sessions', { 
                    email: this.state.email, 
                    password: this.state.password 
                });

                await AsyncStorage.setItem('@AirBnbApp:token', response.data.token);

                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Main' })
                    ],
                });

                this.props.navigation.dispatch(resetAction);
            } catch (err) {
                console.log(this.state.email);
                console.log(this.state.password);
                this.setState({ error: 'Houve um problema com o login, verifique suas credencais!' })
            }
        }
    };

    render() {
        return (
            <Container>
                <StatusBar hidden />
                <Logo source={require('../../images/airbnb-logo.png')} resizeMode="contain" />
                <Input
                    placeholder="Endereço de e-mail"
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                    autoCapitalize="none"
                    underlineColorAndroid="#FFF"
                    underline
                    autoCorrect={false}
                />
                <Input
                    placeholder="Senha"
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    autoCapitalize="none"
                    underlineColorAndroid="#FFF"
                    autoCorrect={false}
                    secureTextEntry
                />
                { this.state.error.lenght !== 0 && <ErrorMessage>{ this.state.error }</ErrorMessage> }
                <Button onPress={this.handleSingInPress}>
                    <ButtonText>Entrar</ButtonText>
                </Button>
                <SignUpLink onPress={this.handleCreateAccountPress}>
                    <SignUpLinkText>Criar conta grátis</SignUpLinkText>
                </SignUpLink>
            </Container>
        );
    }
}