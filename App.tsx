/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import ShipmentStatusProvider from './SRC/Context/ShipmentStatus';
import Navigation from './SRC/Navigation/Navigation';
function App() {
  return (
    <ShipmentStatusProvider>
    <Navigation/>
    </ShipmentStatusProvider>
 );
}


export default App;
