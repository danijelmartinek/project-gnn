<template>
  <v-container>

        <div class="pt-5">
          <v-dialog v-model="deleteDialog" max-width="500px">
            <v-card>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <br>
                    <span class="title">Želite li izbrisati korisnika {{ deleteUserFirstName }} {{ deleteUserLastName }} iz grupe?</span>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click.native="confirmDelete">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-card-title>
            <h1>{{ $store.state.userGroup.groupName }}</h1>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="users"
            :search="search"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.firstName }} {{ props.item.lastName }}</td>
              <td class="text-xs-left">{{ props.item.email }}</td>
              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                  <v-icon color="pink">delete</v-icon>
                </v-btn>
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
            <template slot="no-data">
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </div>

        <v-layout row wrap>
          <v-flex xs12 sm6>
            <v-select
              label="Select"
              :items="usersWithWrongId"
              v-model="a1"
              item-text="name"
              item-value="name"
              multiple
              chips
              max-height="auto"
              autocomplete
            >
              <template slot="selection" slot-scope="data">
                <v-chip
                  close
                  @input="data.parent.selectItem(data.item)"
                  :selected="data.selected"
                  class="chip--select-multi"
                  :key="JSON.stringify(data.item)"
                >
                  {{ data.item.firstName }} {{ data.item.lastName }}
                </v-chip>
              </template>
              <template slot="item" slot-scope="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ data.item.firstName }} {{ data.item.lastName }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ data.item.email }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-select>
          </v-flex>
          <v-flex xs12 sm6>
            <v-btn color="primary" dark @click.native="addUser(a1)" class="mb-2">Dodaj</v-btn>
          </v-flex>
        </v-layout>
  
  </v-container>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import qs from 'qs'

export default {
  middleware: 'admin',
  data: () => ({
    addDialog: false,
    deleteDialog: false,
    search: '',
    headers: [
      {
        text: 'Ime i prezime',
        align: 'left',
        value: 'firstAndLastName'
      },
      {
        text: 'Email',
        align: 'left',
        value: 'email'
      },
      { text: 'Delete', align: 'center', value: 'delete', sortable: false }
    ],
    users: [],
    usersWithWrongId: [],
    deleteUserFirstName: null,
    deleteUserLastName: null,
    userIndex: null,
    a1: null
  }),

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      axios.get(`http://localhost:3000/api/users`)
      .then(response => {
        const idOfGroup = this.groupId
        const UsersWithRightId = []
        const UsersWithNoId = []

        response.data.forEach(function(user, index) {
          if (user.groupId == idOfGroup) {
            UsersWithRightId.push(user);
          }else if(user.groupId){
          }else{
            UsersWithNoId.push(user);
          }
        });
        this.users = UsersWithRightId
        this.usersWithWrongId = UsersWithNoId
      })
    },

    deleteItem (item) {
      this.deleteDialog = true
      this.userIndex = this.users.indexOf(item)
      this.deleteUserFirstName = this.users[this.userIndex].firstName
      this.deleteUserLastName = this.users[this.userIndex].lastName
    },

    confirmDelete () {
      this.deleteDialog = false
      this.users[this.userIndex].groupId = null

      axios.post('/api/update_user', qs.stringify(this.users[this.userIndex]))
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });

      setTimeout(function () {
        this.initialize()
      }.bind(this), 200);

      this.users.splice(this.userIndex, 1)
    },

    addUser (items) {
      const idOfGroup = this.groupId

      if(this.a1[0] != null) {
        items.forEach(function(user) {
          user.groupId = idOfGroup
        });

        axios.post('/api/update_user', qs.stringify(items))
          .then(function (response) {})
          .catch(function (error) {
            console.log(error);
          });

        setTimeout(function () {
          this.a1.length = 0;
          this.initialize();
        }.bind(this), 100);
      }
    },

    close () {
      this.addDialog = false
      this.deleteDialog = false
    }
  },

  computed: {
    groupId () {
      return this.$store.state.userGroup._id  
    }
  }
}
</script>

<style scoped>
.user-select{
  margin-top: 100px;
  padding: 3em;
}
</style>