<template>
    <section>
        <h1>Reports</h1>
    </section>
</template>



<script lang="ts" setup>

import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const { user } = storeToRefs(useAuthStore()); // make authenticated state reactive

</script>