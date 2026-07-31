<template>
  <div class="flex flex-col items-center justify-center py-8">
    <div v-if="!user">
      <button @click="signInWithGoogle" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Sign in with Google</button>
    </div>
    <div v-else class="flex flex-col items-center">
      <img :src="user.photoURL || '/images/user/user-icon.svg'" alt="User" class="w-16 h-16 rounded-full mb-2" />
      <div class="font-bold text-lg">{{ user.displayName }}</div>
      <div class="text-gray-600">{{ user.email }}</div>
      <button @click="signOutUser" class="mt-4 px-4 py-2 bg-gray-300 rounded-lg">Sign Out</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth, googleProvider as provider, signInWithPopup, signOut, db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const user = ref(null);

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const profile = result.user;
    user.value = profile;
    // Store user profile in Firestore
    await setDoc(doc(db, 'users', profile.uid), {
      uid: profile.uid,
      displayName: profile.displayName,
      email: profile.email,
      photoURL: profile.photoURL,
    }, { merge: true });
  } catch (error) {
    alert('Sign in failed: ' + error.message);
  }
};

const signOutUser = async () => {
  await signOut(auth);
  user.value = null;
};

onMounted(() => {
  onAuthStateChanged(auth, (profile) => {
    user.value = profile;
  });
});
</script>
