<template>
    <Card className="my-5 lg:!h-fit">
        <div class="flex mb-1 justify-between">
            <div class="flex gap-4 items-center">
                <Icon :icon="selectedProject(project)" class="text-lg text-primary-500 cursor-pointer" @click="addSelectedProject(project)" />
                <a href="#">
                    <h4 class="text-primary-500 font-medium text-base flex gap-1">
                        <div class="underline font-normal">{{ project.owner_name }}</div>/<div class="underline ">{{
                            project.name }}</div>
                    </h4>
                </a>
            </div>
            <div>
                <a :href="githubUrl(project)" target="_blank" class="btn btn-secondary btn-sm cursor-pointer">GitHub</a>
            </div>
        </div>
        <div class="text-xs text-secondary-600">
            <p class="flex gap-2">
            <div>
                <span><span class="font-medium">Última extracción:</span> {{ toLocalDate(project.last_extraction_date)
                }}</span>
            </div>
            |
            <div>
                <span><span class="font-medium">Lenguaje:</span> {{ project.language }}</span>
            </div>
            |
            <div>
                <span><span class="font-medium">Fecha creación:</span> {{ toLocalDate(project.created_at) }}</span>
            </div>
            </p>
        </div>
        <hr class="my-4" />
        <div class="flex gap-8">
            <template v-for="rating in project.rating" :key="rating.id">
                <RatingData
                    :rating="rating.rating"
                    :text="rating.name"
                    :value="rating.value"
                    :type=2
                    size="xs"
                />
            </template>
            <!-- <RatingData rating="D" text="Stars" value="90" :type=2 size="xs" />
            <RatingData rating="C" text="Stars" value="90" :type=2 size="xs" />
            <RatingData rating="A" text="Stars" value="90" :type=2 size="xs" />
            <RatingData rating="A" text="Stars" value="90" :type=2 size="xs" />
            <RatingData rating="F" text="Stars" value="90" :type=2 size="xs" />
            <RatingData rating="A" text="Stars" value="90" :type=2 size="xs" /> -->
        </div>
    </Card>
</template>

<script setup>

import Card from "@/components/Card";
import RatingData from "@/components/Explore/RatingData";
import Icon from "@/components/Icon";

const emit = defineEmits(['selectedProject'])


const githubUrl = (project) => {
    return `https://www.github.com/${project.owner_name}/${project.name}`
}

const selectedProject = (project) => {
    if (project.selected) {
        return 'heroicons-solid:star'
    }
    return 'heroicons-outline:star'
}

const addSelectedProject = (project) => {
    project.selected = !project.selected
    emit('selectedProject', project)
}

const toLocalDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
}

const props = defineProps({
    project: {
        type: Object,
        required: true
    }
})
</script>