import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(8, 'Min length of password is 8')
    .max(16, 'Max length of password is 16')
    .required('Password is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenrated, setisPassGenrated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [symbols, setSetsymbols] = useState(false);
  const [numbers, setNumbers] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numbersChars = '0123456789';
    const spacelChars = '~!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += numbersChars;
    }
    if (symbols) {
      characterList += spacelChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setisPassGenrated(true);
  };

  const createPassword = (chacracter: string, passwordLength: number) => {
    //
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * chacracter.length);
      result += chacracter.charAt(characterIndex);
    }
    console.log(result);
    return result;
  };

  const resetPassword = () => {
    //
    setPassword('');
    setisPassGenrated(false);
    setUpperCase(false);
    setLowerCase(false);
    setNumbers(false);
    setSetsymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContaner}>
        <View style={styles.formContaner}>
          <Text style={styles.appTitle}>Password Generater</Text>
        </View>
        <Formik
          initialValues={{passwordLength: ''}}
          validationSchema={PasswordSchema}
          onSubmit={values => {
            console.log(values);
            generatePasswordString(+values.passwordLength);
          }}>
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleSubmit,
            handleReset,
            /* and other goodies */
          }) => (
            <>
              <View style={styles.inputWraper1}>
                <View style={styles.inputCollum}>
                  <Text style={styles.passLength}>Password Length</Text>
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.passLengthError}>
                      {errors.passwordLength}
                    </Text>
                  )}
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Min: 8"
                    placeholderTextColor={'#ffffff'}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={styles.inputWraper}>
                <Text style={styles.addFeaters}>Include Lowercase</Text>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={lowerCase}
                  onPress={() => setLowerCase(!lowerCase)}
                  fillColor="#29AB87"
                />
              </View>
              <View style={styles.inputWraper}>
                <Text style={styles.addFeaters}>Include Uppercase</Text>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={upperCase}
                  onPress={() => setUpperCase(!upperCase)}
                  fillColor="#29AB87"
                />
              </View>
              <View style={styles.inputWraper}>
                <Text style={styles.addFeaters}>Include Numbers</Text>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={numbers}
                  onPress={() => setNumbers(!numbers)}
                  fillColor="#29AB87"
                />
              </View>
              <View style={styles.inputWraper}>
                <Text style={styles.addFeaters}>Include Symbols</Text>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={symbols}
                  onPress={() => setSetsymbols(!symbols)}
                  fillColor="#29AB87"
                />
              </View>

              <View style={styles.formAction}>
                <TouchableOpacity
                  disabled={!isValid}
                  style={[styles.generateBtn, styles.btn]}
                  onPress={handleSubmit}>
                  <Text style={styles.txtGenSet}>Generate Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.resetBtn, styles.btn]}
                  onPress={() => {
                    handleReset();
                    resetPassword();
                  }}>
                  <Text style={styles.txtGenSet}>Reset</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        {isPassGenrated ? (
          <View style={styles.bigCard}>
            <View style={styles.passwordCard}>
              <Text style={styles.cardText}>Password</Text>
              <Text selectable={true} style={styles.passSty}>
                {password}
              </Text>
              <Text style={styles.copyPass}>Long Press to Copy</Text>
            </View>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContaner: {
    margin: 5,
  },
  formContaner: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
  },
  inputWraper1: {
    backgroundColor: '#164B67',
    marginTop: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  inputCollum: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passLength: {
    fontWeight: '800',
    color: 'white',
  },
  passLengthError: {
    color: 'red',
  },
  inputStyle: {
    color: 'white',
  },
  inputWraper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#164B67',
    marginTop: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    padding: 10,
  },
  addFeaters: {
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
  },
  formAction: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    padding: 10,
  },
  generateBtn: {
    width: 180,
    alignItems: 'center',
    backgroundColor: '#00A854',
  },
  btn: {
    padding: 15,
    borderRadius: 50,
  },
  resetBtn: {
    width: 180,
    alignItems: 'center',
    backgroundColor: '#00A4B8',
  },
  txtGenSet: {
    color: 'white',
    fontWeight: '500',
  },
  bigCard: {
    flex: 1,
    alignItems: 'center',
  },
  passwordCard: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#164B67',
    borderRadius: 10,
    padding: 10,
    width: 250,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 5,
  },
  passSty: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  copyPass: {
    fontSize: 12,
    fontWeight: '400',
    color: '#ffffff',
  },
});
