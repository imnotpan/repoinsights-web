<template>
    <div class="w-5/6 m-auto">
        <img src="@/assets/images/metabase/logo.svg" class="m-auto my-5" width="80" />
        <div class="relative">
            <div className="text-center w-3/4 m-auto">
                <Card bodyClass="py-8 px-10 ">
                    <h1 class="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block mb-2">
                        Metabase</h1>
                    <p class="text-sm text-slate-600 w-2/3 m-auto">Herramienta de BI en donde podrás utilizar toda la
                        información de los repositorios publicos</p>
                    <div v-if="metabaseURL" class="mt-4">
                        <p @click="copyToClipboard(metabase.name)"
                            class="cursor-pointer flex justify-center align-center items-center mb-1">
                            <span class="font-semibold">Usuario: </span>
                            <span>{{ metabase.name }}</span>
                            <Icon :icon="copied ? 'mdi:clipboard-check' : 'mdi:clipboard-text'"
                                class="ml-2 text-ml text-slate-600" />
                        </p>
                        <p>
                            <span class="font-semibold">Contraseña: </span>
                            <span>{{ metabase.pass }}</span>
                            <button @click="sendInvitation" class="underline font-semibold ml-2"> Reenviar</button>
                        </p>
                    </div>
                    <a :href="metabaseURL" target="_blank" rel="noopener noreferrer">
                        <Button :isDisabled="!metabaseURL" icon="heroicons:arrow-up-right" iconClass=" text-ml ml-2"
                            iconPosition="right" text="Ir a Metabase" btnClass="btn-primary py-2 normal-case" />
                    </a>
                </Card>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useUserStore } from "@/store/user";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useToast } from 'vue-toastification';

const userStore = useUserStore()
const toast = useToast();

const metabaseURL = ref(null)
const copied = ref(false)

const metabase = {
    name: userStore.user.email,
    pass: "Te hemos enviado un correo para la creación de tu contraseña"
};

const sendInvitation = () => {
    try {
        userStore.sendInvitation()
        toast.success('Correo enviado correctamente')
    } catch (error) {
        toast.error('Error al enviar el correo')
        console.log(error)
    }

}

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        console.log(`Texto copiado al portapapeles: ${text}`);
        toast.success('Texto copiado al portapapeles')
        copied.value = true

    }, (err) => {
        console.error('Error al copiar el texto al portapapeles: ', err);
    });
}

(async () => {
    try {
        const { data } = await userStore.getMetabaseURL()
        metabaseURL.value = data.url
    } catch (error) {
        console.log(error)
    }
})()

</script>