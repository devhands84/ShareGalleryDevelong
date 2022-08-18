import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {View, StyleSheet, Platform, Pressable} from 'react-native';
import {SignOut} from '../lib/auth';
import {createUser} from '../lib/users';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import {useUserContext} from '../contexts/UserContext';
import {launchImageLibrary} from 'react-native-image-picker';

function SetupProfile() {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();
  const {setUser} = useUserContext();

  const {params} = useRoute();
  const {uid} = params || {};
  const onSubmit = () => {
    const user = {
      id: uid,
      displayName,
      photoURL: null,
    };
    createUser(user);
    setUser(user);
  };

  const onCancel = () => {
    SignOut();
    navigation.goBack();
  };

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        console.log(res);
      },
    );
  };

  return (
    <View style={styles.block}>
      <Pressable style={styles.circle} onPress={onSelectImage} />
      <View style={styles.form}>
        <BorderedInput
          placeholder="nickName"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType="next"
        />
        <View style={styles.buttons}>
          <CustomButton title="Next" onPress={onSubmit} hasMarginBottom />
          <CustomButton title="Cancel" onPress={onCancel} theme="secondary" />
        </View>
      </View>
    </View>
  );
}
export default SetupProfile;

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  circle: {
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
});
