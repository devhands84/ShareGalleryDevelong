import React from 'react';
import {useRoute} from '@react-navigation/native';
import PostCard from '../components/PostCard';
import {ScrollView, StyleSheet} from 'react-native';

function PostScreen() {
  const route = useRoute();
  const {post} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.conentContainer}>
      <PostCard
        user={post.user}
        photoURL={post.photoURL}
        description={post.description}
        createdAt={post.createdAt}
        id={post.id}
      />
    </ScrollView>
  );
}

export default PostScreen;

const styles = StyleSheet.create({
  block: {flex: 1},
  contentContainerStyle: {
    paddingBottom: 40,
  },
});
