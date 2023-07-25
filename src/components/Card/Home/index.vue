<template>
    <Card className="col-span-12 md:col-span-4" bodyClass=" px-4 py-5">
        <div class="mb-2">
            <span class="text-xs leading-none">{{ props.subtitle }}</span>
            <h4 class="text-sm leading-none">{{ props.title }}</h4>
        </div>
        <Button btnClass="dark:text-white dark:bg-slate-700 btn bg-slate-900 text-white py-2 text-xs" :text=props.buttonText
            @click="goToRoute" />
    </Card>
</template>

<script setup>

import Button from "@/components/Button";
import Card from "@/components/Card"
import { useRouter } from 'vue-router'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    buttonText:{
        type: String,
        required: true
    },
    routeName:{
        type: String,
        required: true
    }
})

const router = useRouter()

const goToRoute = () => {
    router.push({ name: props.routeName })
}

</script>