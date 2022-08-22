import firestore from '@react-native-firebase/firestore';

const postCollection = firestore().collection('posts');

export function createPost({user, photoURL, description}) {
  return postCollection.add({
    user,
    photoURL,
    description,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

export const PAGE_SIZE = 6;
export async function getPosts({userId, mode, id} = {}) {
  let query = postCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE);
  if (userId) {
    query = query.where('user.id', '==', userId);
  }
  if (id) {
    const cursorDoc = await postCollection.doc(id).get();
    query =
      mode === 'older'
        ? query.startAfter(cursorDoc)
        : query.endBefore(cursorDoc);
  }

  const snapshot = await query.get();
  const posts = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  return posts;
}

export async function getOlderPosts(id, userId) {
  return getPosts({id, mode: 'older', userId});
}

export async function getNewerPosts(id, userId) {
  return getPosts({id, mode: 'newer', userId});
}
