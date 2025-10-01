import { StyleSheet, Button } from 'react-native';
import { useContext, useCallback } from 'react';
import { Text, View } from '@/components/Themed';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { AuthContext } from '@/context/AuthContext';
import { apiGetUserData } from '@/api/services';

export default function HomeScreen() {
  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    throw new Error('AuthContext must be used within AuthProvider');
  }
  const { user, accessToken, setUser } = authContext;
  

  // check for external updates 
  useFocusEffect(
    useCallback(() => {
      const refreshUserData = async () => {
        const updatedUserData = await apiGetUserData();
        if (updatedUserData) {
          setUser(updatedUserData);
        }
      };
      refreshUserData();
    }, [accessToken])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to Capio, {user?.username || "user"}! 
      </Text> 
      {user?.phone && 
        <Text style={{fontSize: 16, fontWeight: "500"}} > 
          Telephone number: {user?.phone}
        </Text>} 
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Go to Profile" onPress={() => router.push('/profile')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
