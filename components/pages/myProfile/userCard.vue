<template>
    <v-card class="elevation-15">
        <v-card-media :src="this.$store.state.authUser.profilePic" height="250"></v-card-media>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-2">{{ this.$store.state.authUser.firstName }} {{ this.$store.state.authUser.lastName }}</h3>
                <span class="grey--text">{{ this.$store.state.authUser.city }}, {{ this.$store.state.authUser.state }}</span><br>
                <span>{{ this.$store.state.authUser.email }}</span><br><br>
                <span class="subheading grey--text"><b>Bio</b></span><br>
                <span>
                <i>
                    {{ this.$store.state.authUser.userBio }}
                </i>
                </span>
            </div>
        </v-card-title>

        <editProfile />

    </v-card>
</template>

<script>
import editProfile from '~/components/pages/myProfile/editProfile.vue'

export default {
  name: 'userCard',
  components: {
    editProfile
  }
}
</script>

<style scoped>

</style>