<template>
    <div v-if="type == 1" class="flex w-full justify-between">
        <span :class=[sizeClasses[size].text]>{{ text }}</span>
        <div class="flex gap-2">
            <span class="font-medium" :class="[sizeClasses[size].value]">{{ value }}</span>
            <Rating :rating="rating" :size=sizeClasses[size].circle :text=sizeClasses[size].circleText />
        </div>
    </div>

    <div v-else-if="type == 2" class="leading-none">
        <div class="flex gap-2 justify-center">
            <Rating :rating="rating" :size=sizeClasses[size].circle :text=sizeClasses[size].circleText />
            <span v-if="!hideValue" class="font-medium" :class="[sizeClasses[size].value]">{{ roundValue(value) }}</span>
        </div>
        <span :class=[sizeClasses[size].text]>{{ text }}</span>

    </div>
</template>

<script setup>
import Rating from "@/components/Rating";

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
    hideValue: {
        type: Boolean,
        default: false
    }
}
);

const roundValue = (value) => {
    return Math.round(value * 10) / 10
}


</script>