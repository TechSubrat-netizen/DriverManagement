import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {
const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <TextInput
        placeholder='Enter your Email'
        style={styles.textBox}
        keyboardType='email-address'
      />
      <TextInput
        placeholder='Enter your Password'
        style={styles.textBox}
        secureTextEntry
      />

      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('DashBoardScreen')}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textBox: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  btn: {
    width: '100%',
    height: 45,
    borderRadius: 8,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
