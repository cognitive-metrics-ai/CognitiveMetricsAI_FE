<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Sign in to your account</h2>
      <button @click="signInWithGoogle" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">Sign in with Google</button>
    </div>
  </div>
</template>

<script setup>
import { auth, googleProvider as provider, signInWithPopup, db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const router = useRouter();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const profile = result.user;
    // Store user profile in Firestore
    await setDoc(doc(db, 'users', profile.uid), {
      uid: profile.uid,
      displayName: profile.displayName,
      email: profile.email,
      photoURL: profile.photoURL || '/images/user/user-icon.svg',
    }, { merge: true });
    router.push('/profile');
  } catch (error) {
    alert('Sign in failed: ' + error.message);
  }
};
</script>
