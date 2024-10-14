import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';

const LoginScreen = () => {
    return (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#b3ffb3' }}>
            <Text style={{ fontSize: hp(6), fontWeight: 'bold' }}>Digital India</Text>
            <Text style={styles.headerText}>Kyc Registration Agency</Text>
            <TouchableOpacity style={styles.saveButton} onPress={() => router.push('/HomeScreen')}>
                <Text style={styles.saveButtonText}>KYC REGISTRATION</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={() => router.push('/VarificationScreen')}>
                <Text style={styles.saveButtonText}>VARIFY KYC</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    headerText: {
        fontSize: wp(5),
        marginBottom: hp(2),
        textAlign: 'center',
    },
    saveButton: {
        backgroundColor: '#007bff',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(6),
        borderRadius: wp(2),
        alignSelf: 'center',
        marginTop: hp(3),
    },
    saveButtonText: {
        color: '#fff',
        fontSize: wp(4),
        textAlign: 'center',
        fontWeight: 'bold'
    },
});
export default LoginScreen