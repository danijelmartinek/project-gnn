<template>
  <v-container>

        <v-layout row wrap class="pt-5">
          <v-dialog v-model="deleteDialog" max-width="500px">
            <v-card>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <span class="title">Želite li izbrisati korisnika {{ deleteUserFirstName }} {{ deleteUserLastName }} iz grupe?</span>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">Nazad</v-btn>
                <v-btn color="blue darken-1" flat @click.native="confirmDelete">Izbriši</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-flex xs12 sm12 md8>
            <v-card flat>
              <v-layout row wrap class="pt-5">
                <v-flex xs12 sm8 md9>
                  <v-card-title class="title"><b>{{ $store.state.userGroup.groupName }}</b><span class="pl-2 body-2">- {{ $store.state.userGroup.groupDescription }}</span></v-card-title>
                </v-flex>
                <v-flex xs12 sm4 md3>
                  <v-text-field
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    v-model="search"
                  ></v-text-field> 
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          
          <v-flex xs12 sm12 md8>
            <v-data-table
              :headers="headers"
              :items="users"
              :search="search"
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.username }}</td>
                <td class="text-xs-right">{{ props.item.firstName }}</td>
                <td>{{ props.item.lastName }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                    <v-icon color="pink">delete</v-icon>
                  </v-btn>
                </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Tražili ste "{{ search }}" - nema rezultata.
              </v-alert>
            </v-data-table>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12 sm5>
            <v-select
              label="Select"
              :items="usersWithWrongId"
              v-model="a1"
							:filter="customFilter"

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
                    <v-list-tile-sub-title>{{ data.item.username }} - {{ data.item.email }}</v-list-tile-sub-title>
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
  data: () => ({
    addDialog: false,
    deleteDialog: false,
    search: '',
    headers: [
			{
        text: 'Username',
        align: 'left',
        value: 'username'
      },
      {
        text: 'Ime',
        align: 'right',
        value: 'firstName'
      },
			{
        text: 'Prezime',
        align: 'left',
        value: 'lastName'
      },
      {
        text: 'Email',
        align: 'left',
        value: 'email'
      },
      { text: 'Izbriši', align: 'center', value: 'delete', sortable: false }
    ],
		 customFilter (item, queryText, itemText) {
          const hasValue = val => val != null ? val : ''
					
          if(queryText != null && this.users != null){
            console.log(item);
            var username = item.username.toLowerCase();
            var firstName = item.firstName.toLowerCase();
            var lastName = item.lastName.toLowerCase();
            var email = item.email.toLowerCase();


            queryText = queryText.toLowerCase();

            if(username.includes(queryText) == true){
              const text = hasValue(item.username)
              const query = hasValue(queryText)
              return text.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
            }
            else if(firstName.includes(queryText) == true){
              const text = hasValue(item.firstName)
              const query = hasValue(queryText)
              return text.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
            }
            else if(lastName.includes(queryText) == true){
              const text = hasValue(item.lastName)
              const query = hasValue(queryText)
              return text.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
            }
            else if(email.includes(queryText) == true){
              const text = hasValue(item.email)
              const query = hasValue(queryText)
              return text.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
            }
          }
          else{
            return item;
          }
          
        },
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
      axios.get(`/api/users`)
      .then(response => {
        const idOfGroup = this.groupId
        const UsersWithRightId = []
        const UsersWithNoId = []

        response.data.forEach(function(user, index) {
          if (user.groupId == idOfGroup) {
            UsersWithRightId.push(user);
          }else if(user.groupId == null){
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

      axios.post('/api/delete_user_from_group', qs.stringify(this.users[this.userIndex]))
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });

      setTimeout(function () {
        this.initialize()
      }.bind(this), 200);

      this.users.splice(this.userIndex, 1)
    },

    addUser (users) {
      const idOfGroup = this.groupId

      if(this.a1[0] != null) {
        users.forEach(function(user) {
          user.groupId = idOfGroup;
        });

        axios.post('/api/update_user', qs.stringify(users))
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