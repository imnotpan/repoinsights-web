<template>
    <div v-if="type == 1" class="flex w-full justify-between">
        <span :class=[sizeClasses[size].text]>{{ text }}</span>
        <div class="flex gap-2">
            <span v-if="showValue"  class="font-medium" :class="[sizeClasses[size].value]">{{ roundValue(value) }}<small>{{ measure
            }}</small></span>
            <Rating :rating="rating" :size=sizeClasses[size].circle :text=sizeClasses[size].circleText />
        </div>
    </div>

    <div v-else-if="type == 2" class="leading-none text-center">
        <div class="flex gap-2 justify-center">
            <Rating :rating="rating" :size=sizeClasses[size].circle :text=sizeClasses[size].circleText :measure="measure" />
            <span v-if="showValue" class="font-medium" :class="[sizeClasses[size].value]">{{ roundValue(value) }}<small>{{
                measuremnts[measurement] ? measuremnts[measurement] : measure
            }}</small></span>
        </div>
        <span :class=[sizeClasses[size].text]>
            {{ text }}
        </span>

    </div>
</template>

<script setup>
import Rating from "@/components/Rating";
import { onMounted, ref } from "vue";

const sizeClasses = {
    xs: {
        circle: 'h-5 w-5',
        circleText: 'text-xs',
        value: 'text-sm',
        text: 'text-xs'
    },
    lg: {
        circle: 'h-6 w-6',
        circleText: 'text-base',
        value: 'text-base',
        text: 'text-base'
    },
    xl: {
        circle: 'h-7 w-7',
        circleText: 'text-base',
        value: 'text-xl',
        text: 'text-lg'
    }
}

const measuremnts = {
    'h': 'horas',
    'd': 'días',
    '%': '%'
}

const measurement = ref('')
const props = defineProps({
    type: {
        type: Number,
        required: false,
        default: 1
    },
    rating: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    value: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        default: 'xl'
    },
    showValue: {
        type: Boolean,
        default: false
    },
    measure: {
        type: String,
        default: '',
        required: false

    }
}
);

const roundValue = (value) => {
    let roundedValue = null
    if (props.measure == '%') {
        roundedValue = Math.round(value * 100)
    }
    else {
        roundedValue = Math.round(value * 10) / 10
        if (props.measure == 'h' && roundedValue > 100) {
            roundedValue = Math.round(roundedValue / 24)
            measurement.value = 'd'
        }
    }
    return roundedValue
}

onMounted(() => {
    measurement.value = props.measure
})


</script>