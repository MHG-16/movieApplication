<template>
  <div class>
    <v-container>
      <v-row>
        <v-col cols="12" sm="4">
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
              <router-link :to="`/movie/${movie.id}`">
                <v-img :src="posterPath" />
              </router-link>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="8">
          <h1 class="text-grey-darken-3 mt-5">{{ movie.title }}</h1>
          <v-row>
            <span class="ma-3 text-subtitle-2">
              Rating: {{ movie.vote_average / 2 }}
            </span>
            <span
              v-for="(item, index) in movie.genres"
              :key="index"
              class="ml-1 mt-3 text-subtitle-2 text-grey"
            >
              {{ item.name }}
              <span v-if="movie.genres.length - 1 != index">,</span>
            </span>
          </v-row>
          <v-row>
            <div>
              <span
                v-for="(item, index) in movie.genres"
                :key="index"
                class="ml-1"
              >
                {{ item.name }}
                <span v-if="movie.genres.length - 1 != index">,</span>
              </span>
            </div>
          </v-row>
          <h2 class="text-pink-darken-1 mt-5 text-h-4">Overview:</h2>
          <p class="mt-2 text-grey-darken-3 text-body-1">
            {{ movie.overview }}
          </p>
          <div class="mt-5">
            <h2 class="mt-5 text-grey-darken-3">Featured Cast</h2>
            <div :key="index" v-for="(crew, index) in movie.credits.crew">
              <div v-if="index < 2">
                <h3>{{ crew.name }}</h3>
                <span class="text-grey">
                  {{ crew.job }}
                </span>
              </div>
            </div>
          </div>
            <v-btn
              tile
              color="error"
              @click="toggleShow"
              @click.prevent="openYouTubeModel"
            >
              <v-icon icon="fas fa-play" />
              Play Trailer
            </v-btn>
            <v-dialog v-model="dialog" presistent max-width="800px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ this.movie.title }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="">
                        <div class="iframe-container">
                          <img
                            :src="mediaURL"
                            alt="videoTrailer"
                            v-if="!isVideo"
                          />
                          <iframe
                            allowfullscreen
                            v-if="isVideo"
                            :src="mediaURL"
                          />
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="dialog = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn tile color="error" class="ml-2">
                <v-icon icon="fa-solid fa-heart"></v-icon>
                <span>Favorite</span>
            </v-btn>
        </v-col>
      </v-row>
      <v-divider class="mt-2"></v-divider>
      <v-row><CastComponent :casts="movie.credits.cast" /></v-row>
      <v-divider class="mt-2"></v-divider>
      <Images :images="movie.images.backdrops" />
    </v-container>
  </div>
</template>

<script>
import api from "@/services/api";
import CastComponent from "@/components/CastComponent.vue";
import Images from "@/components/ImagesComponents.vue";

export default {
  data() {
    return {
      movie: {
        credits: {
          crew: {},
        },
        images: {
          backdrops: {},
        },
        isVideo: false,
        mediaURL: "",
      },
      dialog: false,
    };
  },
  components: {
    CastComponent,
    Images
},
  mounted() {
    this.fetchMovie(this.$route.params.id);
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.fetchMovie(this.$route.params.id);
      },
      imediate: true,
    },
  },
  computed: {
    posterPath() {
      return "https://image.tmdb.org/t/p/w500/" + this.movie.poster_path;
    },
    rating() {
      return this.movie.vote_average / 2;
    },
  },
  methods: {
    async fetchMovie(movieId) {
      const response = await api.get(
        `/movie/${movieId}?append_to_response=credits,videos,images`
      );
      this.movie = response.data;
    },
    openYouTubeModel() {
      this.mediaURL = this.youtubeVideo();
      this.isVideo = true;
    },
    youtubeVideo() {
      if (!this.movie.videos) return;
      return (
        "https://www.youtube.com/embed/" + this.movie.videos.results[0].key
      );
    },
    toggleShow() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style>
.iframe-container {
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;
}

.iframe-container iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100% !important;
}
</style>
