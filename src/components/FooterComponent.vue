<template>
    <v-footer dark position="bottom">
        <v-card flat class="bg-pink text-white text-center w-100">
            <v-card-text>
                <v-btn 
                    v-for="icon in icons" 
                    :key="icon"
                    :icon="icon"
                    class="mx-4 text-white bg-pink"
                    size="24"
                />
            </v-card-text>
            <v-card-item>
                Enim ex velit magna et ex sunt ullamco aliquip. Amet eu labore deserunt ut deserunt enim anim aliquip nulla esse. Nisi nulla quis duis consequat mollit ipsum quis magna elit. Id tempor qui consectetur ea labore minim aliqua ipsum sunt ullamco labore consectetur.
            </v-card-item>
            <v-spacer></v-spacer>
            <v-card-text class="text-white">
                {{ new Date().getFullYear() }} - MHG_16
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script setup>
const icons = [
    "fab fa-facebook",
    "fab fa-twitter",
    "fab fa-linkedin",
    "fab fa-instagram"
]
</script>

<style scoped>
footer{
    width: 100%;
}

</style>