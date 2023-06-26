<template>
    <div class="ma-4">
        <h2 class="mt-2 text-grey">Popular Movies</h2>
        <v-container fluid>
            <v-row>
                <v-col cols="12" sm="3" 
                    v-for="movie in movies"
                    :key="movie.id"
                >
                    <MovieCard :movie="movie" :genres="genres"/>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import MovieCard from "./MovieCard.vue";
import api from "@/services/api";
import {ref} from 'vue'

const movies = ref([]);
const genres = ref([]);

onMounted(async () => {
    fetchGenres()
    try{
        const response = await api.get("/movie/popular");
        movies.value = [...response.data.results];
    }catch(error){
        console.error(error);
    }
});

const fetchGenres = async () => {
    try{
        const response = await api.get("/genre/movie/list");
        genres.value = response.data.genres;
    } catch (e) {
        console.log(e)
    }
}


</script>