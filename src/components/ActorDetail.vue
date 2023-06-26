<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="4">
                    <v-hover v-slot="{hover}" open-delay="200">
                        <v-card 
                            :elevation="hover ? 16 : 2"
                            :class="{'on-hover': hover}"
                        >
                        <v-img 
                            :src="`https://image.tmdb.org/t/p/w300/${actor.profile_path}`" 
                        />
                        <v-card-text>
                            <v-row class="mx-0 d-flex justify-center my-1">
                                <v-btn 
                                    v-if="socialMedias.instagram_id"
                                    class="mx-2"
                                    icon="fab fa-instagram"
                                    dark
                                    small
                                    color="error"
                                    :href="`https://instagram.com/${socialMedias.instagram_id}`"
                                />
                                <v-btn
                                    v-if="socialMedias.facebook_id"
                                    class="mx-2"
                                    icon="fab fa-facebook"
                                    dark
                                    small
                                    color="error"
                                    :href="`https://facebook.com/${socialMedias.facebook_id}`"
                                >

                                </v-btn>
                                <v-btn 
                                    v-if="socialMedias.twitter_id"
                                    class="mx-2"
                                    icon="fab fa-twitter"
                                    dark 
                                    small
                                    color="error"
                                    :href="`https://twitter.com/${socialMedias.twitter_id}`"
                                />
                                <v-btn 
                                    class="mx-2" 
                                    icon="fas fa-globe-asia"
                                    dark 
                                    small
                                    color="error"
                                />
                            </v-row>
                        </v-card-text>
                        </v-card>
                    </v-hover>
                </v-col>
                <v-col cols="12" sm="8">
                    <h1 class="text-grey-darken-3 mt-5">
                        {{ actor.name }}
                    </h1>
                    <v-row cols="12">
                        <v-btn text icon="fas fa-birthday-cake" color="error" />
                        <span class="text-grey mt-3 mx-2">{{ actor.birthday }}({{ getAge(actor.birthday) }} years)</span>
                        <span class="mt-3"> In {{ actor.place_of_birth }}</span>
                    </v-row>
                    <p class="mt-5 text-grey-darken-3 subheader">
                        {{ actor.biography }}
                    </p>
                    <h4 class="mt-1 text-grey">Know For</h4>
                    <v-row>
                        <v-col 
                            cols="12" sm="3" 
                            v-for="movie in knowFor"
                            :key="movie.id"
                            class="mt-5"
                        >   
                            <v-hover v-slot="{hover}" open-delay="200">
                                <v-card 
                                    :elevation="hover ? 16 : 2"
                                    :class="{'on-hover' : hover}"
                                >
                                    <router-link 
                                        :to="`/movie/${movie.id}`"
                                    >
                                        <v-img :src="movieImage(movie)"/>
                                    </router-link>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-divider class="mt-2"></v-divider>
            <h2 class="mt-2 text-grey">Credits</h2>
            <ul class="pl-5 mt-8"  v-for="cast in castMovies" :key="cast.id">
                <li v-if="cast.title">
                    <strong >{{ castDetails(cast) }}</strong>
                    <v-btn  text :to="`/movie/${cast.id}`" class="bg-white text-pink">
                        {{ cast.title }}
                    </v-btn>
                    as {{ cast.character }}
                </li>
            </ul>
        </v-container>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import api from '@/services/api';

const route = useRoute();
const id = route.params.id;

const socialMedias = ref([]);
const actor = ref({});
const knowFor = ref([]);
const castMovies = ref({});

onMounted(() =>{
    fetchActor(id);
    fetchCredits(id);
    fetchSocial(id);
});

const fetchActor = async (actorId) => {
    const response = await api.get(`/person/${actorId}`);
    actor.value = response.data;
};

const fetchCredits = async (actorId) => {
    const response = await api.get(`/person/${actorId}/combined_credits`);
    castMovies.value = response.data.cast;
    knowFor.value = response.data.cast
        .filter((x) => x.media_type == "movie")
        .slice(1, 6);
};

const movieImage = (movie) => {
    const posterPath = movie.poster_path;
    if(!posterPath) return "https://via.placeholder.com/185x278";
    return "https://image.tmdb.org/t/p/w185" + posterPath;
}

const fetchSocial = async(actorId) => {
    const response = await api.get(
        `/person/${actorId}/external_ids`
    )

    socialMedias.value = response.data;
}

const castDetails = (cast) => {
    return parseInt(cast.release_date) + " .";
}

function getAge(birth){
    const birthYear = new Date(birth).getFullYear()
	var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    const age = currentYear - birthYear;
    return age;
}
</script>