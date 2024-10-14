import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from '../firebaseConfig';

const HomeScreen = () => {
    const [loader, setLoader] = useState(false);
    const categoryList = ['Parents', 'Spouse/Partner', 'Family Relatives', 'Friends', 'Inheritance', 'Part time job', 'Stipend', 'Rent', 'job'];
    const [category, setCategory] = useState('');
    const [value, setValue] = useState({ occupation: '', subOccupation: '', income: '', })
    const db = getFirestore(app);
    async function handleSubmit() {
        setLoader(true);
        if (value.occupation.length > 0 && value.subOccupation.length > 0 && value.income.length > 0) {
            const docRef = await addDoc(collection(db, "occupation"), value);
            router.push('/LoginScreen')
            window.alert("KYC completed successfully")
        } else {
            ToastAndroid.show('Fill all fields', ToastAndroid.SHORT);
            window.alert('Fill all fields')
        }
        setLoader(false);
    }
    function changeHandler(data: any, val: any) {
        setValue((prev: any) => {
            return {
                ...prev,
                [data]: val
            }
        })
    }
    if (loader) return <ActivityIndicator size='large' color="#0000ff" style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    }} />

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.headerText}>Enter Occupational Details</Text>
                <View>
                    <TextInput
                        placeholder='Occupation'
                        style={styles.inputField}
                        onChangeText={(e) => changeHandler("occupation", e)}
                    />
                    <TextInput
                        placeholder='Sub Occupation'
                        style={styles.inputField}
                        onChangeText={(e) => changeHandler("subOccupation", e)}
                    />
                    <Text style={styles.label}>Source of funds</Text>
                    <Picker
                        selectedValue={category}
                        style={styles.picker}
                        onValueChange={(value: any) => setCategory(value)}
                    >
                        {categoryList.map((category, index) => (
                            <Picker.Item label={category} value={category} key={index} />
                        ))}
                    </Picker>
                    <TextInput
                        placeholder='Annual Income(INR)'
                        style={styles.inputField}
                        onChangeText={(e) => changeHandler("income", e)}
                        keyboardType="number-pad"
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>

                        <Text style={styles.saveButtonText}>Save Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp(5),
        paddingTop: 150,
        backgroundColor: '#e6ffff'
    },
    headerText: {
        fontSize: hp(3),
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
    },
});

export default HomeScreen;

