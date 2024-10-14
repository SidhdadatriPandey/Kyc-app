import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated } from 'react-native';
import { router } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const WelcomeScreen = () => {
    const fadeAnim = new Animated.Value(0); // Initialize fade animation value

    useEffect(() => {
        // Fade-in animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();

        // Navigate to HomeScreen after 2 seconds
        const timer = setTimeout(() => {
            router.push('/LoginScreen');
        }, 3000);

        // Clear timeout on component unmount
        return () => clearTimeout(timer);
    }, []);

    return (
        <ImageBackground
            source={{ uri: 'data:image/jpeg;base64,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' }} // Add a cinematic background image
            style={styles.background}
        >
            <View style={styles.container}>
                <Animated.View style={{ opacity: fadeAnim }}>
                    <Text style={styles.title}>
                        K
                        <Text style={styles.highlighted}>YC</Text>
                    </Text>
                </Animated.View>
                <Text style={styles.subtitle}>Your gateway to the best varification</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    container: {
        alignItems: 'center',
    },
    title: {
        fontSize: hp(7.2),
        fontWeight: 'bold',
        color: '#FFD700',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: hp(1),
    },
    highlighted: {
        fontSize: hp(7.2),
        color: '#FFF',
    },
    subtitle: {
        color: '#FFF',
        fontSize: hp(2.8),
        marginTop: hp(1),
        fontStyle: 'italic',
    },
});

export default WelcomeScreen;
