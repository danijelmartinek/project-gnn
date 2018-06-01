<template>
  <div class="container">
    <v-layout row wrap>
      <v-flex xs12 style="margin-top: 50px">
        <v-card>
          <v-layout row wrap align-center class="app-description">
            <v-flex xs12 md4 text-xs-center   class="app-title">
              <h1>{{ appTitle }}</h1>
            </v-flex>
            <v-flex xs12 md8 class="app-info">
              <v-card-text>
                {{ appDescription }}
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
        <v-layout row wrap>
          <v-flex class="activities-cards" xs12 sm12 md4>
            <v-card>
              <v-card-title>
                <v-select
                  :items="groups"
                  v-model="e1"
                  item-text="groupName"
                  label="Select"
                  single-line
                ></v-select>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex class="activities-cards" xs12 sm6 md4>
            <v-card>
              <v-toolbar color="indigo" dark>
                <v-toolbar-title>Poredak po prijeđenoj udaljenosti</v-toolbar-title>
              </v-toolbar>
              <v-list style="padding-top: 1.5em;">
                <v-list-tile avatar v-for="(user, index) in usersByDistance.slice(0,10)" :key="user.userData.username"> 
                  <v-list-tile-content>
                    <v-list-tile-title> <span class="user-username">{{ index + 1 }}. {{ user.userData.username }}</span> <span class="user-distance">{{ (group.locations[0]) ? (user.distance * 2) : user.distance }} m</span> </v-list-tile-title>
                    <v-list-tile-title> <v-divider></v-divider> </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex class="activities-cards" xs12 sm6 md4>
            <v-card>
              <v-toolbar color="indigo" dark>
                <v-toolbar-title>Poredak po broju {{ (group.locations[0] || group.locations == 'oncreate') ? "dolazaka" : "aktivnosti" }}</v-toolbar-title>
              </v-toolbar>
              <v-list style="padding-top: 1.5em;">
                <v-list-tile avatar v-for="(user, index) in usersByActivityCount.slice(0,10)" :key="user.userData.username"> 
                  <v-list-tile-content>
                    <v-list-tile-title> <span class="user-username">{{ index + 1 }}. {{ user.userData.username }}</span> <span class="user-distance">{{ user.activityCount }}</span> </v-list-tile-title>
                    <v-list-tile-title> <v-divider></v-divider> </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import qs from 'qs'

export default {
  middleware: 'username',
  data () {
    return {
      appTitle: "CarLess",
      appDescription: "Mauris ac suscipit felis. Praesent ornare ex at mauris imperdiet, in facilisis libero dignissim. Suspendisse est nibh, ornare id ullamcorper id, tristique quis odio. Aenean lobortis sollicitudin nisi, sodales laoreet erat sagittis in. Nullam eu elit posuere, mollis sapien pretium, viverra risus. Nulla turpis quam, ultrices sed ultrices et, volutpat eget mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris vestibulum efficitur faucibus. Cras vitae nulla a arcu pellentesque faucibus in et tellus. Nam dignissim tempus elementum. In accumsan volutpat tristique. Praesent eu rutrum enim.",
      e1: null,
      groups: [],
      group: {},
      groupsData: [],
      groupUsers: [],

      arrangedUsersByDistance: [],
      arrangedUsersByActivityCount: []
    }
  },

  created: function () {
    this.group.locations = 'oncreate';
    setTimeout(function () {
      this.initialize();
    }.bind(this), 200);
  },

  watch: {
    e1: function (){
      var t = this;
      this.groupsData.forEach(group => {
        if(group._id == t.e1._id){
          t.group = group.groupInfo;
          t.groupUsers = group.users;
        }
      });
    }
  },

  methods: {
    initialize () {
      
      axios.get(`/api/activities/monthly/all`)
      .then(response => {
        this.groupsData = response.data;
      }).then( data => {

        axios.get(`/api/activity/groups`)
        .then(response => {
          var t = this;
          response.data.forEach(userGroup => {
            t.groupsData.forEach(userGroupWithActivity => {
              if(userGroup._id == userGroupWithActivity._id){
                t.groups.push(userGroup);
              }
            });
          });
          
          this.e1 = this.groups[0];
        })
        .then(response => {
          var t = this;
          t.groupsData.forEach(group => {
            if(group._id == t.e1._id){
              t.group = group.groupInfo;
              t.groupUsers = group.users;
            }
          });
        });
      });

    }
  },

  computed: {

    usersByDistance: function() {
      function compare(a, b) {
        if (a.distance > b.distance)
          return -1;
        if (a.distance < b.distance)
          return 1;
        return 0;
      }

      this.arrangedUsersByDistance = [];

      this.groupUsers.forEach(user => {
        this.arrangedUsersByDistance.push(user);
      });

      return this.arrangedUsersByDistance.sort(compare);
    },

    usersByActivityCount: function() {
      function compare(a, b) {
        if (a.activityCount > b.activityCount)
          return -1;
        if (a.activityCount < b.activityCount)
          return 1;
        return 0;
      }

      this.arrangedUsersByActivityCount = [];

      this.groupUsers.forEach(user => {
        this.arrangedUsersByActivityCount.push(user);
      });

      return this.arrangedUsersByActivityCount.sort(compare);
    }
  }
}
</script>

<style scoped>
.container{
  margin-top: 50px;
}

.app-description{
  min-height: 200px;
}

.app-info{
  padding: 1em;
  border-left: 2px solid #90A4AE;
}

.activities-cards{
  padding-top: 0.5em;
}

@media only screen and (min-width: 600px) {
  .activities-cards:nth-of-type(1){
    padding-top: 2em;
  }

  .activities-cards:nth-of-type(2){
    padding-right: 1em;
  }

  .activities-cards:nth-of-type(3){
    padding-left: 1em;
  }
}

@media only screen and (min-width: 960px) {
  .activities-cards{
    padding-top: 2em;
  }

  .activities-cards:nth-of-type(1){
    padding-right: 1em;
  }

  .activities-cards:nth-of-type(2){
    padding-right: 1em;
    padding-left: 1em;
  }

  .activities-cards:nth-of-type(3){
    padding-left: 1em;
  }
}

.user-username{
  float: left;
  margin-left: 1em;
}

.user-distance{
  float: right;
  margin-right: 1em;
}
</style>