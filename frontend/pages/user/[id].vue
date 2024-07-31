<template>
    <section>
        <h2 class="text-4xl font-bold dark:text-white">Edit User</h2>
        <section class="p-3 sm:p-5">
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <span class="text-1xl font-bold">{{ loadingText }}</span>

                <form @submit.prevent="updateUser">
                    <div
                        class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Credentials</h3>
                    </div>
                    <div class="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                            <input disabled :value="editUser.email" type="email" name="email" id="email"
                                class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type user's e-mail" required>
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input disabled value="**************" type="password" name="password" id="password"
                                class="cursor-not-allowed  opacity-60 bg-gray-50 border border-gray-300 text-slate-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
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
                            <input v-model="editUser.name" type="text" name="name" id="name"
                                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Sherek the third" required>
                        </div>
                        <div>

                            <label for="role"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                            <select v-if="allowedToEditRole" id="role" required v-model="editUser.role"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option selected value="">Select role</option>
                                <option v-for="role in roles" :key="role.value" :value="role.value">{{ role.label }}
                                </option>
                            </select>
                            <input v-else v-model="editUser.role" type="text" name="role" id="role"
                                class="cursor-not-allowed opacity-60 bg-gray-50 border border-gray-300 text-slate-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                disabled>
                        </div>
                        <div>
                            <label for="mobileNumber"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile
                                Number</label>
                            <input v-model="editUser.mobileNumber" type="tel" name="mobileNumber" id="mobileNumber"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="55 55555 5555" required>
                        </div>
                    </div>

                    <button type="submit" :disable="enableUpdate"
                        class="text-white inline-flex items-center font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        :class="{ 'cursor-not-allowed bg-gray-500': !enableUpdate, 'bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300': enableUpdate }">
                        <NuxtIcon name="ic:round-plus" size="18" />
                        Save User
                    </button>
                </form>
            </div>
        </section>
    </section>
</template>

<script lang="ts" setup>
import { ENDPOINTS } from '~/services/api';

const route = useRoute()

import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const { user } = storeToRefs(useAuthStore()); // make authenticated state reactive


const editUser = ref({
    email: null,
    name: null,
    role: '',
    mobileNumber: null,
});

const backUser = ref({
    email: null,
    name: null,
    role: '',
    mobileNumber: null,
});
const loading = ref(false);
const loadingText = ref('');
const allRoles = [
    { value: "admin", label: "Administrator" },
    { value: "editor", label: "Editor" },
    { value: "customer", label: "Customer" },
];

const roles = ref([]);


// computed

const allowedToEditRole = computed(() => {
    return roles.value.some(role => role.value === editUser?.value?.role)
})

const enableUpdate = computed(() => {
    return JSON.stringify(backUser.value) !== JSON.stringify(editUser.value);
})


// functions
const rolesAllowedForUser = () => {
    if (!user.value) return [];

    const userRoleIndex = allRoles?.findIndex((role) => {
        return role.value === user.value?.role;
    })
    return allRoles?.splice(userRoleIndex);
}



const updateUser = async () => {
    loading.value = true;
    loadingText.value = 'Updating profile...';
    try {

        const response = await useApi(`${ENDPOINTS.profile}/${route.params.id}`, {
            method: 'PUT',
            data: editUser.value
        })
    } catch (error: any) {
        console.log(error);
        alert('Error updating user profile');
    }
    finally {
        loadingText.value = '';
        loading.value = false;
    };

}


// setup/asyncData
if (user.value) {
    roles.value = rolesAllowedForUser() as any;
} else {
    const userWatch = watch(() => {
        return user.value
    }, () => {
        if (user?.value?.role) {
            roles.value = rolesAllowedForUser() as any;
            userWatch && userWatch();
        }

    }, { deep: true, immediate: true })
}


const { data: credentials } = await useAPI(`${ENDPOINTS.user}/${route.params.id}`)
const { data: profile } = await useAPI(`${ENDPOINTS.profile.user}/${route.params.id}`)


editUser.value = {
    email: credentials?.value?.email,
    name: profile?.value?.name,
    role: credentials?.value?.role,
    mobileNumber: profile?.value?.mobileNumber
};

backUser.value = {
    email: credentials?.value?.email,
    name: profile?.value?.name,
    role: credentials?.value?.role,
    mobileNumber: profile?.value?.mobileNumber
};

</script>