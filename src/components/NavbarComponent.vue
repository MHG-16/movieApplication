<template>
    <nav class="mb-4">
        <v-system-bar app dark>
            <v-spacer></v-spacer>
            <v-icon icon="fa-minus"></v-icon>
            <v-icon icon="fa-square-check"></v-icon>
            <v-icon icon="fa-xmark"></v-icon>
        </v-system-bar>
        <v-app-bar app color="pink" dark class="pa-4">
            <v-icon class="mx-2" icon="fa-video"></v-icon>
            <v-toolbar-title>AAE Movie</v-toolbar-title>
            <v-btn text class="ml-2" to="/">Movies</v-btn>
            <v-btn text class="ml-2" to="/actors">Actors</v-btn>
            <v-btn text class="ml-2" to="/profile">Profile</v-btn>
            <v-btn text class="ml-2" to="/contact">Contact</v-btn>
            <v-spacer></v-spacer>
            <v-autocomplete
                clearable
                hide-no-data
                hide-selected
                color="white"
                label="search"
                prepend-inner-icon="fa-magnifying-glass"
                flat
                class="mt-4"
                :items="movies"
                item-text="title"
                item-value="id"
                id="search"
            >
                <template v-slot:item="{item}">
                    <v-btn text :to="`/movie/${item.value}`">
                        {{ item.title }}
                    </v-btn>
                </template>
            </v-autocomplete>
            <v-btn icon>
                <v-badge color="green" content="2" overlap>
                    <v-icon icon="fa-bell"></v-icon>
                </v-badge>
            </v-btn>
            <v-badge 
                    bordered 
                    bottom 
                    color="green" 
                    dot 
                    offset-x="10" 
            >
                <v-avatar size="40" class="">
                    <v-img src="https://cdn.vuetifyjs.com/images/lists/3.jpg"/>
                </v-avatar>
            </v-badge>
        </v-app-bar>
    </nav>
</template>

<script>
import api from '@/services/api';
export default {
    data: () => {
        return {
            drawer: null,
            model: '',
            search: null,
            movies: []
        }
    },
    mounted(){
        this.loadMovies()
    },
    methods: {
        loadMovies: async function() {
            try{
                const response = await api.get("/movie/popular");
                this.movies = response.data.results;  
            }catch(error){
                console.log(error)
            }
        }
    }
}
</script>