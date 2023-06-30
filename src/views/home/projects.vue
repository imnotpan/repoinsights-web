<template>
    <div class="grid grid-cols-4 gap-4">
        <Card className="p-8 col-span-4">
            <div class="mb-6">
                <p class="text-xl font-semibold text-slate-900 dark:text-white">Tokens de acceso</p>
                <p>Tokens disponibles para extraer la información de tu repositorio</p>
            </div>
            <div>
                <div class="relative" v-if="tokens.length > 0">
                    <vue-good-table :columns="tokensColumns" :rows="tokens" />
                    <div class="text-center mt-10">
                        <!-- <p class="font-light">No has agregado tokens personales...</p> -->
                        <button class="btn-outline-warning px-2 py-3 rounded-sm" @click="toggleModal">Agregar token personal</button>
                    </div>
                </div>

            </div>
        </Card>

        <Card className="py-8 px-4 col-span-4">
            <p class="mb-6 text-xl font-semibold text-slate-900 dark:text-white">Agrega tu repositorio privado</p>
            <div class="relative w-full">
                <p class="text-center font-semibold">Repositorios de {{ username }}</p>
                <div>
                    <ul>
                        <li v-for="repo in repositories" :key="repo.id" @click="selectRepo(repo)">
                            <div
                                class="flex items-center my-2 cursor-pointer hover:bg-gray-100 p-3 rounded-md transition-colors duration-200 border-b-2">
                                <div class="flex items-center flex-1">
                                    <div class="hover:!text-red-400">
                                        <a :href="repo.url" target="_blank">
                                            <h4 class="text-sm"> {{ repo.name }}</h4>
                                        </a>
                                        <p class="text-sm">{{ repo.description }}</p>
                                    </div>
                                </div>
                                <div>
                                    <Badge v-if="repo.added && repo.loading === false" label="Agregado" badgeClass="bg-green-500 text-white" />
                                    <Badge v-else-if="!repo.added && repo.loading === false" label="Agregar" badgeClass="bg-blue-500 text-white"  />
                                    <SimpleLoader v-else />
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="flex justify-around">
                        <button class="disabled:opacity-50 disabled:cursor-not-allowed" :disabled="!pagination.prev"
                            @click="changePage(pagination.prev)">anterior</button>
                        <button class="disabled:opacity-50 disabled:cursor-not-allowed" @click="changePage(pagination.next)"
                            :disabled="!pagination.next">siguente</button>
                    </div>
                </div>
            </div>
        </Card>

        <Modal title="Token personal de GitHub" :activeModal="show" @close="show = false" >
                <p>No sabes como obtenerlo? <span><a href="https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token" target="_blank">Instrucciones</a></span></p>
                <form @submit.prevent="onSubmit" class="space-y-4 mt-4">
                    <Textinput type="text" placeholder="Ingresa tu token de acceso" name="token" v-model="token"
                        :error="tokenError" :msgTooltip=true />
                    <div class="text-right mt-2">
                        <Button text="Agregar" btnClass="btn-dark "></Button>
                    </div>
                </form>
        </Modal>
    </div>
</template>

<script setup>
import Textinput from "@/components/Textinput";
import Button from "@/components/Button";
import { useField, useForm } from "vee-validate"
import * as yup from "yup";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/store/user";
import Icon from "@/components/Icon";
import SimpleLoader from "@/components/Loader/simpleLoader.vue"
import { useToast } from 'vue-toastification';
import Card from "@/components/Card"
import axiosClient from "@/plugins/axios";
import Modal from "@/components/Modal";
import Badge from "@/components/Badge"; 


const userStore = useUserStore();
const toast = useToast();

const username = userStore.user?.name;

const repositories = ref([])
const pagination = ref({})
const tokens = ref([])
const show = ref(false)

const schema = yup.object({
    token: yup.string().required()
});

const tokensColumns = [
    {
        field: "value",
        label: "Token",
    },
    {
        field: "created_at",
        label: "Fecha de creación",
        type: "date",
        // 2023-06-01T00:58:49.125Z	
        dateInputFormat: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
        dateOutputFormat: "dd/MM/yyyy",
    },
    {
        field: "type",
        label: "Tipo",
    }
]

const selectRepo = (repo) => {
    if (repo.loading === false && repo.added === false) {
        repo.loading = !repo.loading;
        axiosClient.post("api/github/projects/add",{
            id: repo.id,
            url: repo.url,
            name: repo.name
        }).then((response) => {
            repo.added = true
            repo.loading = false
            toast.success(`${repo.name} agregado con éxito!`)
        }).catch((error) => {
            console.log(error)
            repo.loading = false
            toast.error(`Error al agregar ${repo.name}`)
        })
    }

}

const { handleSubmit, values } = useForm({
    validationSchema: schema,
});

const { value: token, errorMessage: tokenError } = useField("token");

const onSubmit = handleSubmit(async () => {
    axiosClient.post("api/github/tokens/add", {
        token: token.value
    }).then((response) => {
        tokens.value.push(response.data.data)
        toast.success("Token agregado con éxito!")
        show.value = false
    }).catch((error) => {
        console.log(error)
        toast.error("Error al agregar token")
    }).finally(() => {
        token.value = ""
        show.value = false
    })

});

const toggleModal = () => {
    show.value = !show.value
}

const changePage = async (page) => {
    if (page) {
        try {
            console.log("loading user repos...")
            const response = await axiosClient.get(`api/github/projects/?page=${page}`)
            repositories.value = response.data.projects
            pagination.value = response.data.pagination
            console.log(repositories.value)
            console.log(pagination.value)
        } catch (error) {
            console.error('Error fetching user repos', error);
        }
    }
}

const getUserData = (async () => {
    try {
        console.log("loading user repos...")
        const response = await axiosClient.get("api/github/projects/")
        repositories.value = response.data.projects
        pagination.value = response.data.pagination
        console.log(repositories.value)
        console.log(pagination.value)
    } catch (error) {
        console.error('Error obteniendo proyectos del usuario', error);
        toast.error("Error obteniendo proyectos del usuario")
    }
})

const getTokensData = (async () => {
    const { data } = await axiosClient.get("api/github/tokens")
    tokens.value = data.data
    console.log(tokens.value)
})

onMounted(async () => {
    Promise.all([getUserData(), getTokensData()])
})

</script>

<style lang="scss" scoped>
$bg-color-disabled: #D3D3D3; // LightGray
$text-color-disabled: #FFFFFF; // White

button {
    &:disabled {
        background-color: $bg-color-disabled;
        color: $text-color-disabled;
        cursor: not-allowed;
    }
}


.clickable:hover {
    background-color: #F3F4F6; // Hover color (Light gray)
}
</style>
