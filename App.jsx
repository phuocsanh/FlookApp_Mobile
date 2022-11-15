import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { StyleSheet } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { store, persistor } from './src/Store/store';
import { NativeBaseProvider} from 'native-base'
import Toast from 'react-native-toast-message';


import MainStack from './src/routes/MainStack'
import getTheme from './src/theme';
import Loading from './src/components/Loading';
// import RootNavigator from './src/RootNavigator';
import ToastContainer from './src/components/Toast';
import StatusModal from './src/components/StatusModal';
import Spinner from "react-native-loading-spinner-overlay/lib";



const RenderApp = () => {
  const isLoading = useSelector(state => state.AppReducer.isLoading)

  const scheme = useColorScheme();
  return (
    <PersistGate loading={<Loading/>} persistor={persistor}>
      <NavigationContainer theme={getTheme(scheme)}>
        <SafeAreaProvider style={{backgroundColor: 'white'}}>
          <NativeBaseProvider>
          <MainStack/>
          <StatusBar />
          <StatusModal />
          <ToastContainer />
          <Toast position='top' topOffset={100}/>
          {/* {isLoading ? <Loading/> : null} */}
          {/* <Spinner visible={isLoading} color="#ebebeb"/> */}
          </NativeBaseProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </PersistGate>
  )
}

const App = () => <Provider store={store}><RenderApp/></Provider>


export default App

const styles = StyleSheet.create({
 
})


