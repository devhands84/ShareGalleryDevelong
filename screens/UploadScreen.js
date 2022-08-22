import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  TextInput,
  Animated,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import IconRightButton from '../components/IconRightButton';
import storage from '@react-native-firebase/storage';
import {useUserContext} from '../contexts/UserContext';
import {v4} from 'uuid';
import {createPost} from '../lib/posts';

function UploadScreen() {
  const route = useRoute();
  const {res} = route.params || {};
  const {width} = useWindowDimensions();
  const animation = useRef(new Animated.Value(width)).current;
  const [isKeybordOpen, setIsKeybordOpen] = useState(false);
  const [description, SetDescription] = useState('');
  const navigation = useNavigation();

  const {user} = useUserContext();

  const onSubmit = useCallback(async () => {
    navigation.pop();
    const asset = res.assets[0];
    const extension = asset.fileName.split('.').pop();
    const reference = storage().ref(`/photo/${user.id}/${v4()}.${extension}`);
    if (Platform.OS === 'android') {
      await reference.putString(asset.base64, 'base64', {
        contentType: asset.type,
      });
    } else {
      await reference.putFile(asset.uri);
    }
    const photoURL = await reference.getDownloadURL();
    await createPost({user, photoURL, description});
  }, [res, user, description, navigation]);

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeybordOpen(true),
    );
    const didHide = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeybordOpen(false),
    );
    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isKeybordOpen ? 0 : width,
      useNativeDriver: false,
      duration: 150,
      delay: 100,
    }).start();
  }, [isKeybordOpen, width, animation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={onSubmit} name="send" />,
    });
  }, [navigation, onSubmit]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})}
      style={styles.block}
      keyboardVerticalOffset={Platform.select({ios: 180})}>
      <Animated.Image
        source={{uri: res.assets[0]?.uri}}
        style={[styles.image, {height: animation}]}
        resizeMode="cover"
      />
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder=" picture discription"
        textAlignVertical="top"
        value={description}
        onChangeText={SetDescription}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  image: {
    width: '100%',
  },
  input: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flex: 1,
    fontSize: 16,
  },
});

export default UploadScreen;
