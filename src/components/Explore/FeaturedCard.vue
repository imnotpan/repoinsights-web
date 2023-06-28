<template>
    <Card className="col-span-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer lg:!h-fit">
        <div class="flex gap-2 justify-between">
            <div class="flex gap-2">
                <div v-if="!avatar_url" class="w-10 h-10">
                    <SkeletonLoader :number=1 :height=40 />
                </div>
                <img v-else :src="avatar_url" width="64" height="64" class="w-10 h-10">
                <div class="flex flex-col">
                    <h4 class="powner">{{ project.owner_name }}</h4>
                    <h5 class="pname">{{ project.name }}</h5>
                </div>
            </div>
            <LikeStar :project="project" @starClicked="handleSelect" className="!text-2xl" />
        </div>
        <span class="description my-2">
            <span class="font-medium">Última actualización:</span> {{ toLocalDate(project.last_extraction_date) }}
            <span class="font-medium">Lenguaje:</span> {{ project.language }}</span>
        <ul class="w-full">
            <template v-for="rating in project.rating" :key="rating.id">
                <li class="border-y py-2">
                    <RatingData :rating=rating.rating :text=rating.name :value=rating.value size="xs"
                        :measure="rating.measurement" :showValue=rating.show_value />
                </li>

            </template>
        </ul>
    </Card>
</template>

<script setup>
import Card from "@/components/Card";
import RatingData from "@/components/Explore/RatingData";
import SkeletonLoader from "@/components/Skeleton/index.vue";
import LikeStar from "@/components/Explore/LikeStar.vue";

import { onMounted, ref } from "vue";

let avatar_url = ref(null);


const emit = defineEmits(["selectedProject"]);
const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
});


const githubImage = async (project) => {
    const githubProjectUrl = `https://api.github.com/repos/${project.owner_name}/${project.name}`;
    const githubProject = await fetch(githubProjectUrl);
    const githubProjectJson = await githubProject.json();
    avatar_url.value = githubProjectJson.owner.avatar_url;
};

onMounted(async () => {
    await githubImage(props.project);
});

const toLocalDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
}

const handleSelect = (project) => {
    emit("selectedProject", project)
}

</script>

  
<style scoped lang="scss">
.featured {
    td {
        padding: 0.5rem 0;
    }

    .powner {
        font-size: 0.8rem;
        font-weight: 600;
        color: #4b5563;
        line-height: 1;
    }

    .pname {
        font-size: 0.9rem;
        font-weight: 600;
        color: #1f2937;
        line-height: 1.3;
    }

    .description {
        font-size: 0.7rem;
        color: #4b5563;
    }

    .card:hover {
        transform: translate(-1px, -1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
}
</style>
