import Reactotron, { asyncStorage } from 'reactotron-react-native';


if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.100.8' }).use(asyncStorage()).useReactNative().connect();

  console.tron = tron;

  tron.clear();
}
