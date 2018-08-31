import { createStackNavigator } from 'react-navigation';

import SingIn from './pages/singIn';
import SingUp from './pages/singUp';
import Main from './pages/main';

const SingnedOut = createStackNavigator({
    SingIn,
    SingUp,
    Main,
});

const SingnedIn = createStackNavigator({
    Main,
});

export { SingnedIn, SingnedOut };
