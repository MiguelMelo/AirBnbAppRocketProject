import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import Routes, { SingnedIn, SingnedOut } from './routes';

class App extends Component {
    state = {
        token: null,
    };

    async componentDidMount() {
        const token = await AsyncStorage.getItem('@AirBnbApp:token');

        this.setState({ token });
    };

    render() {
        if(!this.state.token) {
            return <SingnedOut />;
        } else {
            return <SingnedIn />;
        }

        // return <Routes />;
    }
} 

export default App;