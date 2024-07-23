<template>

    <header class="bg-white">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div class="flex lg:flex-1">
                <a href="#" class="-m-1.5 p-1.5">
                    <h1 class="sr-only">Schirrel</h1>
                    <img class="h-8 w-auto" :src="LOGO" alt="">
                </a>
            </div>
            <div class="hidden lg:flex lg:gap-x-12">
                <template v-for="menu in menus" :key="menu.title">
                    <div class="relative">
                        <NuxtLink class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                            v-if="menu.route" :to="menu.route">
                            <Icon v-if="menu.icon" :name="menu.icon" /> {{ menu.title }}
                        </NuxtLink>
                        <button v-else type="button"
                            class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                            aria-expanded="false" @click="menu.open = !menu.open">
                            <Icon v-if="menu.icon" :name="menu.icon" /> {{ menu.title }}

                            <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                                aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                        <Transition 
                            enter-active-class="duration-300 ease-out"
                            enter-from-class="transform opacity-0 "
                            enter-to-class="opacity-100"
                            leave-active-class="duration-200 ease-in"
                            leave-from-class="opacity-100"
                            leave-to-class="transform opacity-0"
                            >
                            <div v-if="menu.open"
                                class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                <div class="p-4">
                                    <template v-for="item in menu.submenus" :key="item.route">
                                        <div
                                            class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                                            <div
                                                class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <Icon v-if="item.icon" size="28px" :name="item.icon" />

                                            </div>
                                            <div class="flex-auto">
                                                <NuxtLink class="block font-semibold text-gray-900" v-if="item.route"
                                                    :to="item.route"> {{ item.title }}
                                                </NuxtLink>
                                                <p class="mt-1 text-gray-600" v-if="item.description"> {{
                        item.description
                                                    }}</p>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </template>
            </div>
            <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                <a @click="logout" role="button" href="#" class="text-sm font-semibold leading-6 text-gray-900">Log
                    out<span aria-hidden="true">&rarr;</span></a>
            </div>
        </nav>
    </header>

</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { LOGO } from '~/utils/constants';

const router = useRouter();

const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive

const logout = () => {
    logUserOut();
    router.push('/login');
};

const menus = ref([{
    title: 'Reports',
    route: '/reports',
    icon: 'ic:baseline-newspaper',
    submenus: []
}, {
    title: 'Profile',
    route: '/profile',
    icon: '',
    submenus: []
}, {
    title: 'Settings',
    icon: 'ic:baseline-settings',
    submenus: [
        {
            title: 'Users',
            route: '/users',
            icon: 'ic:baseline-person',
        },
        {
            title: 'Configuration',
            route: '/configuration',
            description: 'Setup system values definitions',
            icon: 'ic:outline-view-agenda',

        }]
}])
</script>