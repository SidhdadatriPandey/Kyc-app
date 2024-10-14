import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import WelcomeScreen from './WelcomeScreen'

const index = () => {
    return (
        <View>
            <Redirect href='/WelcomeScreen' />
        </View>
    )
}

export default index