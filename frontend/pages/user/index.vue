<template>
    <section>
        <h2 class="text-4xl font-bold dark:text-white">Create New User</h2>
        <section class="p-3 sm:p-5">
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <span class="text-1xl font-bold">{{ loadingText }}</span>

                <form @submit.prevent="createUser">
                    <div
                        class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Credentials</h3>
                    </div>
                    <div class="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                            <input v-model="newUser.email" type="email" name="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type user's e-mail" required>
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input v-model="newUser.password" type="password" name="password" id="password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="A default first password">
                        </div>
                    </div>
                    <div
                        class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">User Profile</h3>
                    </div>
                    <div class="grid gap-4 mb-4 sm:grid-cols-2">

                        <div>
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input v-model="newUser.name" type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Sherek the third" required>
                        </div>
                        <div><label for="role"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                            <select id="role" required v-model="newUser.role"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option selected>Select role</option>
                                <option value="admin">Administrator</option>
                                <option value="customer">Customer</option>
                                <option value="editor">Editor</option>
                            </select>
                        </div>
                        <div>
                            <label for="mobileNumber"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile
                                Number</label>
                            <input v-model="newUser.mobileNumber" type="tel" name="mobileNumber" id="mobileNumber"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="55 55555 5555" required>
                        </div>
                    </div>

                    <button type="submit" :disable="loading"
                        class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <Icon name="ic:round-plus" size="18" />
                        Add User
                    </button>
                </form>
            </div>
        </section>
    </section>
</template>

<script lang="ts" setup>
import { ENDPOINTS } from '~/services/api';

const { $api } = useNuxtApp()
const router = useRouter();

const newUser = ref({
    email: null,
    name: null,
    role: null,
    mobileNumber: null,
    password: null
});
const loading = ref(false);
const loadingText = ref('');

const createUser = () => {
    console.log(newUser.value);
    saveUser();

}

const saveUser = async () => {
    loadingText.value = 'Creating credentials...';
    loading.value = true;
    try {
        const response = await $api(ENDPOINTS.auth.register,
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    email: newUser.value.email,
                    password: newUser.value.password,
                    role: newUser.value.role

                },
            }
        )
        saveProfile(response.id)
    } catch (error: any) {
        alert('Error creating user credentials');
        loadingText.value = '';
        loading.value = false;
    }

}
const saveProfile = async (id: string) => {
    loadingText.value = 'Creating profile...';
    try {
        const response = await $api(`${ENDPOINTS.profile.create}/${id}`,
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    name: newUser.value.name,
                    mobileNumber: newUser.value.mobileNumber,
                },
            }
        )
        alert('Success');
        router.push('/users');

    } catch (error: any) {
        alert('Error creating user profile');
    }
    finally {
        loading.value = false;
    };
}
</script>