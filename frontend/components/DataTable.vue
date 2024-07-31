<template>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <template v-for="column in columns" :key="column.title">
                    <th scope="col" class="px-4 py-3">{{ column.title }}</th>
                </template>

                <th scope="col" class="px-4 py-3" v-if="actions.length">
                    <span class="sr-only">Actions</span>
                </th>
            </tr>
        </thead>
        <tbody v-if="data">
            <template v-for="item in data" :key="item._id">
                <tr class="border-b dark:border-gray-700">
                    <template v-for="column in columns" :key="column.title">
                        <td class="px-4 py-3"> {{ getFieldValue(item, column) }}</td>

                    </template>
                    <td v-if="actions.length">



                        <div class="inline-flex rounded-md shadow-sm" role="group">
                            <button type="button" v-for="(action, index) in actions" :key="action.type"
                                @click="actionClick({ action, item })"
                                class="px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 hover:bg-gray-100"
                                :class="[action.color, { 'rounded-s-lg': index === 0 }, { 'rounded-e-lg': index === actions.length - 1 }]">
                                <NuxtIcon v-if="action.icon" :name="action.icon" /> {{ action.title }}
                            </button>
                        </div>


                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import type { Action } from '~/models/components/data-table';


const emits = defineEmits(['actionClick']);
const props = defineProps({
    columns: {
        required: true,
        type: Object as PropType<Column[]>
    },
    data: {},
    loading: Boolean,
    actions: {
        type: Object as PropType<Action[]>,
        default: () => []
    },
    crudActions: Boolean
});

const crudActions = [{
    title: 'Edit',
    icon: 'ic:baseline-edit',
    type: 'edit',
    color: 'bg-green-700 hover:bg-green-800 focus:ring-4 text-white',
    permission: ['editor', 'admin']
},
{
    title: 'Delete',
    icon: 'ic:baseline-delete',
    type: 'delete',
    color: 'bg-red-700 hover:bg-red-800 focus:ring-4 text-white',
    permission: ['admin']
}]

const columns = computed(() => {
    return props.columns;
});
const actions = computed(() => {
    return props.crudActions ? crudActions : props.actions;
});
const data = computed(() => {
    return props.data;
});

const getFieldValue = (item: any, column: Column) => {
    if (!column.field) {
        return '';
    }
    return item[column.field];
}
const actionClick = (data: { action: Action, item: any }) => emits('actionClick', data);
</script>