<template>
    <div class="mx-3">
        <h2 class="mt-4 text-grey"> Popular Actors</h2>
        <v-container fluid>
            <v-row>
                <v-col cols="12" sm="3" 
                    :key="actor.id"
                    v-for="actor in actors"
                >
                    <ActorCard :actor="actor"/>
                </v-col>
                <v-col cols="12" class="d-flex justify-center mt-5">
                    <v-btn 
                        class="mx-2" 
                        icon dark 
                        small color="error"
                        v-on:click.prevent="previous()"
                    >
                        <v-icon dark icon="fas fa-step-backward"></v-icon>
                    </v-btn>
                    <v-btn 
                        class="mx-2" 
                        icon="fas fa-step-forward" 
                        dark 
                        small color="error"
                        v-on:click.prevent="next()"
                    />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import ActorCard from "./ActorCard.vue";
import api from "@/services/api";

const currentPage = ref(1);
const actors = ref([]);

onMounted(() => {
    fetchActors(currentPage.value);
});

const fetchActors = async (page) => {
    try{
        const response = await api.get(
            "/person/popular?page=" + page
        )
        actors.value = response.data.results
    }catch(error){
        console.error(error);
    }
};

const next = () => {
    currentPage.value += 1;
    fetchActors(currentPage.value)
}

const previous = ()  => {
    currentPage.value -= 1
    fetchActors(currentPage.value)
}
</script>