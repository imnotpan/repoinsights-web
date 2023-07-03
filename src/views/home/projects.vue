<template>
    <div class="grid grid-cols-12 gap-4">
        <Card className="col-span-6">
            <div class="mb-6">
                <p class="text-lg font-semibold text-slate-900 dark:text-white">Agrega tu repositorio privado</p>
                <p class="text-base">Repositorios de {{ username }}</p>
            </div>
            <div class="min-h-[300px]">
                <template v-for="repo in repositories" :key="repo.id" @click="selectRepo(repo)">
                    <div class="flex justify-between my-3 pb-3 border-b">
                        <div class="flex trunc gap-4">
                            <div>
                                <h4 class="text-sm capitalize"> {{ repo.name }}</h4>
                                <p class="text-xs" :class="{ 'show': repo.description, 'invisible': !repo.description }">
                                    {{ repo.description || 'Sin descripción' }}
                                </p>
                            </div>
                        </div>
                        <div @click="selectRepo(repo)" class="cursor-pointer">
                            <Badge v-if="repo.added && repo.loading === false" label="Eliminar"
                                badgeClass="bg-red-400 text-white !font-normal" />
                            <Badge v-else-if="!repo.added && repo.loading === false" label="Agregar"
                                badgeClass="bg-blue-400 text-white !font-normal" />
                            <SimpleLoader v-else />
                        </div>
                    </div>
                </template>
            </div>
            <Pagination :pagination="pagination" @changePage=changePage />

        </Card>
        <Card className="col-span-6 relative !h-fit">
            <div class="mb-6">
                <p class="text-lg font-semibold text-slate-900 dark:text-white">Tokens de acceso</p>
                <p class="text-base">Tokens disponibles para extraer la información de tu repositorio</p>
            </div>
            <div v-if="tokens.length > 0">
                <!-- <vue-good-table :columns="tokensColumns" :rows="tokens" compactMode /> -->
                <!-- simple table  -->
                <table class="w-full text-sm">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th class="text-left">Token</th>
                            <th class="text-left">Creación</th>
                            <th class="text-left">Tipo</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        <tr v-for="token in tokens" :key="token.id">
                            <td class="text-left font-semibold">{{ token.value }}</td>
                            <td class="text-left">{{ toLocalDate(token.created_at) }}</td>
                            <td class="text-left">{{ token.type }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="text-center mt-10">
                    <button class="btn-outline-primary px-2 py-1 rounded-sm text-sm" @click="toggleModal">Agregar</button>
                </div>
            </div>
        </Card>

        <Modal title="Token personal de GitHub" :activeModal="show" @close="show = false">
            <p>No sabes como obtenerlo? <span><a
                        href="https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
                        target="_blank">Instrucciones</a></span></p>
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
import SimpleLoader from "@/components/Loader/simpleLoader.vue"
import { useToast } from 'vue-toastification';
import Card from "@/components/Card"
import axiosClient from "@/plugins/axios";
import Modal from "@/components/Modal";
import Badge from "@/components/Badge";

import Pagination from "@/components/Navigation/pagination.vue"


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

const selectRepo = (repo) => {
    if (repo.loading === false && repo.added === false) {
        repo.loading = !repo.loading;
        axiosClient.post("api/github/projects/add", {
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
            const response = await axiosClient.get(`api/github/projects/?page=${page}`)
            repositories.value = response.data.projects
            pagination.value = response.data.pagination
        } catch (error) {
            console.error('Error fetching user repos', error);
        }
    }
}

const getUserData = (async () => {
    try {
        const response = await axiosClient.get("api/github/projects/")
        repositories.value = response.data.projects
        pagination.value = response.data.pagination
    } catch (error) {
        console.error('Error obteniendo proyectos del usuario', error);
        toast.error("Error obteniendo proyectos del usuario")
    }
})

const getTokensData = (async () => {
    const { data } = await axiosClient.get("api/github/tokens")
    tokens.value = data.data
})

const toLocalDate = (date) => {
    const format = "dd/MM/yyyy"
    return new Date(date).toLocaleDateString("es-ES", { format })
}

onMounted(async () => {
    Promise.all([getUserData(), getTokensData()])
})

</script>

<style lang="scss" scoped>
.trunc {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

td,
th {
    padding: 0.5rem 0.5rem;
}
</style>
