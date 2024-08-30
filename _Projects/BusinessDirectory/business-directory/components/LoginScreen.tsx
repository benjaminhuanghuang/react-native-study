import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const LoginScreen = () => {
    return (
        <View>
            <View style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 100,
            }}>
                <Image source={require('../assets/images/logo.png')} style={{
                    width: 200,
                    height: 200,
                    borderRadius: 20,
                    borderWidth: 6,
                    borderColor: 'black',
                }} />
            </View>
            <View style={styles.subContainer}>
                <Text>Your Business Directory</Text>

                <TouchableOpacity onPress={() => { }}>
                    <Text style={{
                        color: 'blue',
                        textAlign: 'center'
                    }}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    subContainer: {
        backgroundColor: '#ffff',
        padding: 20,
    }
});

export default LoginScreen