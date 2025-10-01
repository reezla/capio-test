import { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Pressable, SafeAreaViewBase, StyleSheet } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

interface LoginUser {
    username: string;
    password: string;
}

const LoginPage = () => {
    const authContext = useContext(AuthContext);
    
    if (!authContext) {
        throw new Error('AuthContext must be used within AuthProvider');
    }
    
    const { login } = authContext;
    // const { user, login } = useContext(AuthContext);
    const [ user, setUser] = useState<LoginUser>({
        username: "",
        password: ""
    })


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>Login</Text>
                <View style={{gap: 10, width: '80%'}}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                        placeholder='Username'
                        onChangeText={(text) => setUser({...user, username: text})}
                        value={user.username}
                        style={styles.input}
                    ></TextInput>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(text) => setUser({...user, password: text})}
                        value={user.password}
                        style={styles.input}
                    ></TextInput>
                    <Pressable
                        onPress={() => login(user.username.toLowerCase(), user.password.toLowerCase())}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginPage;


const styles = StyleSheet.create({
    container: {
        top: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 15,
        borderRadius: 5
    },
    button: {
        backgroundColor: Colors.capioPrimary,
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
        width: '50%',
        alignSelf: 'center'
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    }
})