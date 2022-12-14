import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {ActionSheetIOS, Platform} from 'react-native';
import {removePost} from '../lib/posts';
import events from '../lib/events';

export default function usePostAction({id, description}) {
  const [isSelecting, setIsSelecting] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const edit = () => {
    navigation.navigate('Modity', {id, description});
  };
  const remove = async () => {
    await removePost(id);
    if (route.name === 'Post') {
      navigation.pop();
    }

    events.emit('removePost', id);
  };

  const onPressMore = () => {
    if (Platform.OS === 'android') {
      setIsSelecting(true);
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['수정', '삭제', '취소'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            edit();
          } else if (buttonIndex === 1) {
            remove();
          }
        },
      );
    }
  };

  const actions = [
    {
      icon: 'edit',
      text: '수정',
      onPress: edit,
    },
    {
      icon: 'delete',
      text: '삭제',
      onPress: remove,
    },
  ];

  const onClose = () => {
    setIsSelecting(false);
  };

  return {
    isSelecting,
    onPressMore,
    onClose,
    actions,
  };
}
