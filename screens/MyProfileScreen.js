import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Profile from '../components/Profile';
import {useUserContext} from '../contexts/UserContext';
function MyProfilesScreen() {
  const {user} = useUserContext();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: user.displayName,
    });
  }, [navigation, user]);

  return <Profile userId={user.id} />;
}

export default MyProfilesScreen;
