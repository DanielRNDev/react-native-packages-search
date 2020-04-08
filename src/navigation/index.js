import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import DependencyExplore from '../screen/DependencyExplorer'
import PackageOverview from '../screen/PackageOverview'

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator initialRouteName="DependencyExplore" headerMode="none">
    <Stack.Screen name="DependencyExplore" component={DependencyExplore} headerMode="none" />
    <Stack.Screen name="PackageOverview" component={PackageOverview} headerMode="none" />
  </Stack.Navigator>
)

export default StackNavigator;
