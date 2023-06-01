<template>
    <div class="flex  justify-between mb-6">
        <p class="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">Metabase</p>
        <Button icon="heroicons:arrow-up-right" 
        iconClass=" text-ml ml-2"
        iconPosition="right"
        text="Ir a Metabase" 
        btnClass="btn-primary"
        @click="redirect" />
    </div>
    <div>
        <Card class="p-6">
            <p class="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 mb-4">Credenciales</p>
            <p><span class="font-semibold">Usuario:</span> <span>{{ metabase.name }}</span></p>
            <p><span class="font-semibold">Contraseña:</span><span>{{ metabase.pass }}</span> <span class="underline"><a href="#" @click="resendEmail">Reenviar</a></span></p>
        </Card>
    </div>
</template>

<script setup>
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import {  ref } from "vue";
import {useUserStore} from "@/store/user";
import { useToast } from 'vue-toastification';

const userStore = useUserStore()
const toast = useToast(); 

const metabase = {
    name: userStore.user.email,
    pass: "Te hemos enviado un correo para la creación de tu contraseña."
};

const resendEmail = () => {
    toast.success("Correo enviado");

}


const redirect = () => {
    window.open("http://localhost:8080/", "_blank");
};
</script>