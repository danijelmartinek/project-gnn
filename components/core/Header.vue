<template>
  <div class="appheader">
      
    <v-toolbar class="hidden-sm-and-up white" fixed dark>
      <v-toolbar-side-icon light @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <span class="center nav_text"><v-toolbar-title>CARLESS</v-toolbar-title></span>
    </v-toolbar>

    <v-navigation-drawer
      temporary
      v-model="drawer"
      absolute
    >
      <v-list dense class="pt-3">
        <v-list-tile class="pt-2">
          <nuxt-link to="/" class="nav_mobile_link">
              <v-btn color="grey darken-4" flat dark><span class="pr-3"><v-icon>home</v-icon></span><span class="headline">Početna</span></v-btn>
          </nuxt-link>
        </v-list-tile>

        <span v-if="!$store.state.authUser"></span>
        <span v-else>
          <v-list-tile class="pt-2 pb-2">
            <nuxt-link to="/profile" class="nav_mobile_link">
                <v-btn color="grey darken-4" flat dark><span class="pr-3"><v-icon>person</v-icon></span><span class="headline">Profil</span></v-btn>
            </nuxt-link>
          </v-list-tile>

          <span v-if="!$store.state.userGroup"></span>
          <v-list-tile class="pt-2 pb-2" v-else>
            <nuxt-link to="/admin" class="nav_mobile_link">
                <v-btn color="grey darken-4" flat dark><span class="pr-3"><v-icon>developer_board</v-icon></span><span class="headline">Admin</span></v-btn>
            </nuxt-link>
          </v-list-tile>
        </span>

        <v-divider ></v-divider>
        <v-list-tile class="pt-2">
          <v-btn href="/auth/strava" class="center pt-3" flat dark large v-if="!$store.state.authUser">
            <img src="~assets/svg/btn_strava_connectwith_orange.svg">
          </v-btn>
          <v-btn href="/logout" class="logout_mobile_button" color="grey darken-4" flat dark v-else>
            <span class="pr-3"><v-icon>exit_to_app</v-icon></span><span class="subheading">Logout</span>
          </v-btn>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="hidden-xs-only white toolbar" fixed dark>
      <v-toolbar-title><span class="nav_text">CARLESS</span></v-toolbar-title>
      <nuxt-link to="/" class="nav_link">
        <v-btn color="black" flat dark>Početna</v-btn>
      </nuxt-link>
      <span v-if="!$store.state.authUser"></span>
      <span v-else>
        <nuxt-link to="/profile" class="nav_link">
          <v-btn color="black" flat dark>Profil</v-btn>
        </nuxt-link>

        <span v-if="!$store.state.userGroup"></span>
        <nuxt-link to="/admin" class="nav_link" v-else>
          <v-btn color="black" flat dark>Admin</v-btn>
        </nuxt-link>
      </span>

      <v-spacer></v-spacer>

      <v-btn flat dark large href="/auth/strava" v-if="!$store.state.authUser">
        <img src="~assets/svg/btn_strava_connectwith_orange.svg">
      </v-btn>
      <v-btn href="/logout" color="black" flat dark v-else>
        <span>Logout</span>
      </v-btn>

    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'appheader',
  mounted: function () {
    this.$store.dispatch('LOAD_ACTIVITY_GROUP_LIST')
  },
  data () {
    return {
      drawer: null,
      right: null
    }
  }
}
</script>

<style scoped>
.appheader{
  z-index: 999;
}
.center{
  width: 100%;
  text-align: center;
}
.nav_text{
  color: #000000;
}
.nav_link{
  text-decoration: none;
}
.nav_mobile_link{
  text-decoration: none;
  margin: 30px;
}
.logout_mobile_button{
  margin: 40px;
}

.toolbar{
  position: absolute;
}
</style>