import { StyleSheet, TextInput, Pressable } from 'react-native';
import { useState, useEffect, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '@/components/Themed'; 
import { Colors } from '@/constants/Colors';
import { AuthContext } from '@/context/AuthContext';
import { apiUpdatePhoneNumber, apiGetUserData } from '@/api/services';

export default function ProfileScreen() {
  const [edit, setEdit] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [ warning, setWarning ] = useState<boolean>(false)
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext must be used within AuthProvider');
  }
  const { accessToken, user, setUser, logout } = authContext;
  
  // Set phone number from user context
  useEffect(() => {
    if (user?.phone) {
      setPhoneNumber(user.phone);
    }
  }, [user]);

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
    }, [accessToken, setUser])
  );

  const updatePhoneNumber = async (): Promise<void> => {
    try {
      if (phoneNumber.length < 10 || phoneNumber.length > 15) {
        setWarning(true)
        return 
      }
      const success = await apiUpdatePhoneNumber(phoneNumber)
      if (success) {
        setEdit(false) 
        setWarning(false)

        // Refresh user data after successful update
        const updatedUserData = await apiGetUserData();
        if (updatedUserData) {
          setUser(updatedUserData);
        }
      } else {
        console.error('Failed to update phone number')
      }
    } catch (error) {
      console.error('Error updating phone number:', error)
    }
  };

  const validatePhoneNumber = (text: any) => {
    setPhoneNumber(text.replace(/[^0-9]/g, ""))
  } 


  return (
    <View style={styles.container}>
      <Pressable onPress={logout}>
        <Text style={{textAlign: 'right'}}>Logout</Text>
      </Pressable>
      <Text style={styles.title}>Profile details</Text>
      <View style={styles.elementWrapper}>
        <Text style={styles.inputLabel}>Phone Number </Text>
        { !edit ?
          <Ionicons name="pencil" style={{marginTop: 13}} size={20} color="#666" onPress={() => setEdit(!edit)} /> :
          <Ionicons name="close" style={{ marginTop: 13}} size={20} color="#666" onPress={() => setEdit(!edit)} />
        }
        { edit ? 
        <TextInput
          placeholder='Write Your Phone Number'
          value={phoneNumber}
          onChangeText={validatePhoneNumber}
          style={[styles.inputField, { backgroundColor: edit ? "#d0d0d059" : "white" }]}
          keyboardType="numeric"
        /> :
          <Text style={{ alignSelf: 'flex-end', fontSize: 16 }}>{phoneNumber}</Text>
        }
      </View>
      {warning && <Text>Phone number shoud be between 10 and 15 signs.</Text>}
       <Pressable
         onPress={() => updatePhoneNumber()}
         style={styles.button}
       >
         <Text style={styles.buttonText}>Save</Text>
       </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  elementWrapper: {
    gap: 10, 
    width: '80%', 
    flexDirection: 'row', 
    alignItems: 'center', 
    top: 100
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  inputField: {
    alignSelf: 'flex-end',
    width: "50%",
    textAlign: "center",
    borderRadius: 5,
    padding: 2,
    
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    backgroundColor: Colors.capioPrimary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: "100%",
    width: '50%',
    alignSelf: 'center',

  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
});
