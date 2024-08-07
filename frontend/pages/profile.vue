<template>
    <section>
        <h2 class="text-4xl font-bold dark:text-white">My Account</h2>
        <section class="p-3 sm:p-5">
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">

                <div
                    class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Credentials</h3>
                </div>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <label for="email"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                        <input v-model="userProfile.email" type="email" name="email" id="email"
                            class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Type user's e-mail" required>
                    </div>
                    <div>
                        <label for="password"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input value="**************" type="password" name="password" id="password"
                            class="cursor-not-allowed  opacity-60 bg-gray-50 border border-gray-300 text-slate-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    </div>
                </div>
                <div
                    class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white"></h3>
                </div>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">

                    <div>
                        <label for="name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input v-model="userProfile.name" type="text" name="name" id="name"
                            class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Sherek the third" required>
                    </div>
                    <div>
                        <label for="mobileNumber"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile
                            Number</label>
                        <input v-model="userProfile.mobileNumber" type="tel" name="mobileNumber" id="mobileNumber"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="55 55555 5555" required>
                    </div>
                </div>

            </div>
        </section>

    </section>
</template>



<script lang="ts" setup>

import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { ENDPOINTS } from '~/services/api';

const { user } = storeToRefs(useAuthStore()); // make authenticated state reactive

const userProfile = ref<UserProfile>({
    email: user?.value?.email,
    password: user?.value?.password,
    role: '',
    mobileNumber: '',
    name: '',
    _pId: '',
    _uId: ''
});
const userWatch = watch(() => {
    return user.value
}, () => {
    console.log(user.value)
    if (userProfile?.value?._pId) {
        userWatch && userWatch();
        return;
    }
    userProfile.value = {
        email: user?.value?.email,
        password: user?.value?.password,
        mobileNumber: user?.value?.mobileNumber,
        name: user?.value?.name,
        role: user?.value?.role,
        _pId: user?.value?._pId,
        _uId: user?.value?._uId
    };
}, { deep: true, immediate: true })


</script>