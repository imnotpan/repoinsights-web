<template>
    <Card className="col-span-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer lg:!h-fit">
        <div class="flex gap-2">
            <img src="https://avatars.githubusercontent.com/u/1496237" width="64" height="64" class="w-10 h-10">
            <div class="flex flex-col">
                <h4 class="powner">Project owner name</h4>
                <h5 class="pname">Project name</h5>
            </div>
        </div>
        <span class="description my-2">1k lines - Python</span>
        <ul class="w-full">
            <li class="border-y py-2">
                <RatingData rating="C" text="Stars" value="90" size="xs" />
            </li>
            <li class="border-y py-2">
                <RatingData rating="D" text="Stars" value="322.2" size="xs" />
            </li>
            <li class="border-y py-2">
                <RatingData rating="E" text="Stars" value="231" size="xs" />
            </li>
            <li class="border-y py-2">
                <RatingData rating="A" text="Stars" value="10" size="xs" />
            </li>
            <li class="border-y py-2">
                <RatingData rating="A" text="Stars" value="3432" size="xs" />
            </li>
            <li class="py-2">
                <RatingData rating="F" text="Stars" value="0.02" size="xs" />
            </li>
        </ul>
    </Card>
</template>

<script setup>
import Card from "@/components/Card";
import RatingData from "@/components/Explore/RatingData";

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
  