import { View, Text, TextInput, TouchableOpacity, ToastAndroid, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getFirestore, getDocs, collection, addDoc, query, where } from "firebase/firestore";
import { app } from '../firebaseConfig';
import { router } from 'expo-router';


const VarificationScreen = () => {
    const [loader, setLoader] = useState(false);
    const db = getFirestore(app);
    function changeHandler(data: any, val: any) {
    }
    const [adhar, setAdhar] = useState('');
    const [name, setName] = useState('');
    async function handleSubmit() {
        setLoader(true);
        if (name.length == 0 || adhar.length == 0) {
            ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
            window.alert('Fill all fields');
            setLoader(false);
            return;
        }
        try {
            const q = query(collection(db, 'Kyc-data'), where('adharNo', '==', adhar));
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                setLoader(false);
                console.log('Data found:', snapshot);
                window.alert('User has done kYC');

            } else {
                setLoader(false);
                window.alert('User not exist');

            }
        } catch (err) {
            setLoader(false);

            console.error('Error fetching data:', err);
            window.alert('An error occurred while fetching the data');
        }
    }
    if (loader) return <ActivityIndicator size='large' color="#0000ff" style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#b3ffb3'
    }} />
    return (
        <View style={{ flex: 1, paddingTop: 150, backgroundColor: '#b3ffb3' }}>
            <Text style={styles.headerText}>VarificationScreen</Text>
            <View>
                <TextInput
                    placeholder='Enter full name'
                    style={styles.inputField}
                    onChangeText={(e) => setName(e)}
                />
                <TextInput
                    placeholder='Enter aadhar no'
                    style={styles.inputField}
                    onChangeText={(e) => setAdhar(e)}
                    keyboardType="number-pad"
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                    <Text style={styles.saveButtonText}>Varify</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp(5),
        marginTop: 50,
    },
    headerText: {
        fontSize: wp(7),
        marginBottom: hp(2),
        textAlign: 'center',
        fontWeight: 'bold'
    },
    inputField: {
        borderWidth: 1,
        borderRadius: wp(3),
        padding: hp(1.5),
        paddingHorizontal: wp(4),
        fontSize: wp(4.5),
        width: wp(80),
        marginVertical: hp(1),
        alignSelf: 'center',
    },
    label: {
        fontSize: wp(4.5),
        marginBottom: hp(1),
        textAlign: 'center',
    },
    picker: {
        height: hp(6),
        width: wp(80),
        alignSelf: 'center',
        marginBottom: hp(2),
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

export default VarificationScreen