<template>
	<header class="w-full bg-white shadow flex items-center justify-between px-6 py-4">
		<div class="font-bold text-lg">Cognitive Metrics AI</div>
		<nav class="flex items-center space-x-6">
			<ul class="flex space-x-4">
				<li><a href="#" class="text-gray-700 hover:text-blue-600">Home</a></li>
				<li><a href="#" class="text-gray-700 hover:text-blue-600">About</a></li>
				<li><a href="#" class="text-gray-700 hover:text-blue-600">Contact</a></li>
			</ul>
					<div class="relative">
						<button @click="toggleProfile" class="ml-4 focus:outline-none">
							<img :src="userPhotoURL" alt="User" class="h-8 w-8 rounded-full object-cover" />
						</button>
						<div v-if="showProfile" class="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50">
							<UserProfile />
						</div>
					</div>
		</nav>
	</header>
</template>

<script setup lang="ts">


import { ref, onMounted } from 'vue';
import { auth } from '@/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import UserProfile from './UserProfile.vue';

const showProfile = ref(false);
const toggleProfile = () => {
	showProfile.value = !showProfile.value;
};

const userPhotoURL = ref('/images/user/user-icon.svg');
onMounted(() => {
	onAuthStateChanged(auth, (user) => {
		if (user && user.photoURL) {
			userPhotoURL.value = user.photoURL;
		} else {
			userPhotoURL.value = '/images/user/user-icon.svg';
		}
	});
});
</script>

