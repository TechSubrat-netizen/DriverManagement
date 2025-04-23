
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../Screen/LoginScreen'
import DashBoardScreen from '../Screen/DashBoardScreen'
import ShipmentDetailsScreen from '../Screen/ShipmentDetailsScreen'

const Stack=createNativeStackNavigator()
const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='LoginScreen'>
            <Stack.Screen  name="LoginScreen" component={LoginScreen} options={{
                headerShown:false
            }}/>
            <Stack.Screen name="DashBoardScreen" component={DashBoardScreen} options={{
                headerShown:false
            }}/>
            <Stack.Screen name="ShipmentDetailsScreen" component={ShipmentDetailsScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
 
  )
}

export default Navigation