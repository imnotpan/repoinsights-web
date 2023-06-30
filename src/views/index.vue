<template>
  <div>
    <h2 class="text-2xl mb-10">Bienvenido {{ username }} 👋</h2>
    <div class="grid grid-cols-8 gap-4">
      <Card className="col-span-3">
        <div class="mb-4">
          <h4 class="text-lg">Agrega tu repositorio privado</h4>
          <p>Razones y explicación...</p>
        </div>
        <Button btnClass="dark:text-white dark:bg-slate-700 btn bg-slate-900 text-white" text="Agregar"
          @click="personalProjectsRoute" />
      </Card>

      <Card className="col-span-3">
        <div class="mb-4">
          <h4 class="text-lg">Buscar proyectos</h4>
          <p>Selecciona proyectos para analizar</p>
        </div>
        <Button btnClass="dark:text-white dark:bg-slate-700 btn bg-slate-900 text-white" text="Agregar"
          @click="browseProjects" />
      </Card>
    </div>
  </div>
</template>

<script setup>

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { useRouter } from 'vue-router'
import Card from "@/components/Card"
import { useUserStore } from "@/store/user";
import { ref } from "vue";


const userStore = useUserStore();
const username = userStore.user?.name;


const router = useRouter();
const personalProjectsRoute = () => {
  router.push({ name: 'Agregar proyecto personal' });
}

const browseProjects = () => {
  router.push({ name: 'Explorar proyectos' });
}

</script>
