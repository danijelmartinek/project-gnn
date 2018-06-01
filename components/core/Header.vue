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
        <v-list-tile class="pt-2 pb-2">
            <v-btn to="/" class="nav_mobile_link" color="grey darken-4" flat dark><span class="pr-3"><v-icon>home</v-icon></span><span class="headline">Početna</span></v-btn>
        </v-list-tile>

        <span v-if="!$store.state.authUser"></span>
        <span v-else>

          <v-list-tile class="pt-2 pb-2">
            <v-btn to="/rank" class="nav_mobile_link" color="grey darken-4" flat dark><span class="pr-3"><v-icon>format_list_numbered</v-icon></span><span class="headline">Poredak</span></v-btn>
          </v-list-tile>

          <v-list-tile class="pt-2 pb-2">
            <v-btn to="/profile" class="nav_mobile_link" color="grey darken-4" flat dark><span class="pr-3"><v-icon>person</v-icon></span><span class="headline">Profil</span></v-btn>
          </v-list-tile>

          <span v-if="!$store.state.userGroup"></span>
          <v-list-tile class="pt-2 pb-2" v-else>
            <v-btn to="/admin" class="nav_mobile_link" color="grey darken-4" flat dark><span class="pr-3"><v-icon>developer_board</v-icon></span><span class="headline">Admin</span></v-btn>
          </v-list-tile>
        </span>

        <v-divider ></v-divider>
        <v-list-tile class="pt-2" v-if="!$store.state.authUser">
          <v-btn to="/login" class="logout_mobile_button" color="grey darken-4" flat dark>
            <span class="pr-3"><v-icon>input</v-icon></span><span class="subheading">Prijava</span>
          </v-btn>
        </v-list-tile>
        <v-list-tile class="pt-2" v-if="!$store.state.authUser">
          <v-btn to="/register" class="logout_mobile_button" color="grey darken-4" flat dark>
            <span class="pr-3"><v-icon>person_add</v-icon></span><span class="subheading">Registracija</span>
          </v-btn>
        </v-list-tile>

        <v-list-tile class="pt-2" v-if="$store.state.authUser">
          <v-btn href="/logout" class="logout_mobile_button" color="grey darken-4" flat dark>
            <span class="pr-3"><v-icon>power_settings_new</v-icon></span><span class="subheading">Odjavi se</span>
          </v-btn>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="hidden-xs-only white toolbar" fixed dark>
      <v-toolbar-title><span class="nav_text">CARLESS</span></v-toolbar-title>
        <v-btn to="/" class="nav_link" color="black" flat dark>Početna</v-btn>
      <span v-if="!$store.state.authUser"></span>
      <span v-else>
        <v-btn to="/rank" class="nav_link" color="black" flat dark>Poredak</v-btn>

        <v-btn to="/profile" class="nav_link" color="black" flat dark>Profil</v-btn>

        <span v-if="!$store.state.userGroup"></span>

        <v-btn to="/admin" class="nav_link" v-else color="black" flat dark>Admin</v-btn>
      </span>

      <v-spacer></v-spacer>
      <span v-if="!$store.state.authUser">
        <v-btn to="/login" color="black" flat dark>
          <span>Prijava</span>
        </v-btn>
        <v-btn to="/register" color="black" flat dark>
          <span>Registracija</span>
        </v-btn>
        <!-- <v-btn flat dark large href="/auth/strava" v-if="!$store.state.authUser">
          <img src="~assets/svg/btn_strava_connectwith_orange.svg">
        </v-btn> -->
      </span>
      <span v-else>
        <v-btn href="/logout" color="black" flat dark>
          <span>Odjavi se</span>
        </v-btn>
      </span>

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

@media only screen and (min-width: 600px) and (max-width:700px)  {
  .nav_text{
    display: none;
  }
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