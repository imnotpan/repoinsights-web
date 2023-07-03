<template>
  <div>
    <h2 class="text-2xl mb-10">Bienvenido {{ username }} 👋</h2>
    <div class="grid grid-cols-12 gap-10">
      <CardHome title="Agrega tu repositorio personal" subtitle="Privado o publico" buttonText="Agregar" routeName="Agregar proyecto personal" />
      <CardHome title="Explorar repositorios" subtitle="Publicos" buttonText="Buscar" routeName="Explorar proyectos" />
      <CardHome title="Pendiente" subtitle="Pendiente" buttonText="Buscar" routeName="Explorar proyectos" />
      <div class="col-span-6">

      </div>
      <Card className="col-span-6">
        <div class="flex justify-between mb-4">
          <h4 class="text-sm">Tus Proyectos seleccionados ({{ userStore.favoriteProjects.length }})</h4>
          <router-link class="text-xs font-semibold text-slate-900" :to="{ name: 'Explorar proyectos' }">
            Ver todos
          </router-link>
        </div>
        <template v-for="(project, index) in userStore.favoriteProjects">
          <SimpleCard :project="project" :index=index />
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>

import Card from "@/components/Card"
import { useUserStore } from "@/store/user";

import SimpleCard from "@/components/Card/Simple.vue";
import CardHome from "@/components/Card/Home/index.vue";


const userStore = useUserStore();
const username = userStore.user?.name;

</script>
