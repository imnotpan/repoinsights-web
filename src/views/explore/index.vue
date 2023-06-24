<template>
    <h1 class="my-10 text-2xl text-center">Proyectos destacados</h1>
    <div class="featured grid grid-cols-3 gap-4">
      <Card className="col-span-1 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
        <h4 class="pname">P name</h4>
        <p class="description my-2">1k lines - Python</p>
        <ul class="w-full">
          <li class="border-y py-2 flex justify-between">
            <span>Stars</span>
            <div class="flex gap-2">
              <span class="font-medium text-xl">90</span>
              <Rating rating="A" />
            </div>
          </li>
          <li class="border-y py-4 flex justify-between">
            <span>Bugs</span>
            <div class="flex gap-2">
              <span class="font-medium text-xl">90</span>
              <Rating rating="D" />
            </div>
          </li>
        </ul>
      </Card>
  
      <Card className="col-span-1 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
        <h3 class="pname">P name</h3>
      </Card>
  
      <Card className="col-span-1 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
        <h3 class="pname">P name</h3>
      </Card>
    </div>
  </template>
  
  <script setup>
  import Card from "@/components/Card";
  import Rating from "@/components/Rating";
  </script>
  
  <style scoped lang="scss">
  .featured {
    td {
      padding: 0.5rem 0;
    }
    .pname {
      font-size: 1.2rem;
      font-weight: 600;
      color: #1f2937;
      line-height: 1;
    }
    .description {
      font-size: 0.9rem;
      color: #4b5563;
    }
    .card:hover {
      transform: translate(-1px, -1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
  </style>
  