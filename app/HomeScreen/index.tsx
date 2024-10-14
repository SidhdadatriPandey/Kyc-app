import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { app } from '../firebaseConfig';
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";

const HomeScreen = () => {
    const [loader, setLoader] = useState(false);
    const categoryList = ['Married', 'Unmarried', 'Other'];
    const [category, setCategory] = useState('');
    const db = getFirestore(app);
    const [value, setValue] = useState({ name: '', phoneNo: '', adharNo: '', panNo: '', email: '' })

    function isValidEmail(email: string) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }
    async function handleSubmit() {
        setLoader(true);
        const check = isValidEmail(value.email)
        if (!check) {
            window.alert("Provide valid email");
            setLoader(false);
            return;
        }
        if (value.phoneNo.length < 10) {
            window.alert("Provide valid phone no")
            setLoader(false);
            return;
        }
        if (value.adharNo.length < 12) {
            window.alert("Provide valid adhar no");
            setLoader(false);
            return;
        }

        if (value.name.length > 0 && value.phoneNo.length > 0 && value.adharNo.length > 0 && value.panNo.length > 0) {
            const docRef = await addDoc(collection(db, "Kyc-data"), value);
            router.push('/OccupationalScreen')
        } else {
            ToastAndroid.show('Fill all fields', ToastAndroid.SHORT);
            window.alert("Fill all fields");
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
    // console.log(value);

    if (loader) return <ActivityIndicator size='large' color="#0000ff" style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    }} />
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#e6ffff' }}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Enter Personal Details</Text>
                <View>
                    <TextInput
                        placeholder='Enter fullname'
                        style={styles.inputField}
                        onChangeText={(e) => changeHandler("name", e)}
                    />
                    <TextInput
                        placeholder='Enter email'
                        style={styles.inputField}
                        onChangeText={(e) => changeHandler("email", e)}
                    />
                    <TextInput
                        placeholder='Enter phone no'
                        style={styles.inputField}
                        keyboardType="number-pad"
                        onChangeText={(e) => changeHandler("phoneNo", e)}
                    />
                    <TextInput
                        placeholder='Enter adhar no'
                        style={styles.inputField}
                        keyboardType="number-pad"
                        onChangeText={(e) => changeHandler("adharNo", e)}
                    />
                    <TextInput
                        placeholder='Enter pan no'
                        style={styles.inputField}
                        onChangeText={(e) => changeHandler("panNo", e)}
                    />
                    <TextInput
                        placeholder='Enter address'
                        style={styles.inputField}
                    />
                    <Text style={styles.label}>Choose marital status</Text>
                    <Picker
                        selectedValue={category}
                        style={styles.picker}
                        onValueChange={(value: any) => setCategory(value)}
                    >
                        {categoryList.map((category, index) => (
                            <Picker.Item label={category} value={category} key={index} />
                        ))}
                    </Picker>
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
        padding: wp(6),
        marginTop: 50,
        fontWeight: 'bold'
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
        fontWeight: 'bold'
    },
});

export default HomeScreen;