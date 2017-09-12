<template>
  <div class="tableviewbike">
    <v-container>
      <v-layout row wrap align-center justify-center>
        <v-flex xs6>
          <v-card-title>
            <span class="headline">Poredak</span>
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
            v-bind:headers="headers"
            :items="items"
            v-bind:pagination.sync="pagination"
            rows-per-page-items = "9"
            hide-actions
            class="elevation-1"
            v-bind:search="search"
          >
          <template slot="items" scope="props">
            <td>{{ props.item.rank }}</td>
            <td class="text-xs-center">{{ props.item.imeiprezime }}</td>
            <td class="text-xs-center">{{ props.item.mjesecno }}</td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'tableviewbike',
    data () {
      return {
        search: '',
        pagination: {},
        headers: [
          {
            text: 'Rank',
            align: 'left',
            value: 'rank'
          },
          {
            text: 'Ime i Prezime',
            align: 'center',
            value: 'imeiprezime'
          },
          {
            text: 'Mjesecno (km)',
            align: 'center',
            value: 'mjesecno'
          }
        ],
        items: [
          {
            value: false,
            rank: 1,
            imeiprezime: 'Pero Perić',
            tjedno: 35,
            mjesecno: 125
          },
          {
            value: false,
            rank: 2,
            imeiprezime: 'Silvio Ilić',
            tjedno: 32,
            mjesecno: 115
          },
          {
            value: false,
            rank: 3,
            imeiprezime: 'Ervin Kovac',
            tjedno: 30,
            mjesecno: 105
          },
          {
            value: false,
            rank: 4,
            imeiprezime: 'Davorin Jurić',
            tjedno: 26,
            mjesecno: 89
          },
          {
            value: false,
            rank: 5,
            imeiprezime: 'David Marković',
            tjedno: 22,
            mjesecno: 74
          },
          {
            value: false,
            rank: 6,
            imeiprezime: 'Dragomir Adamić',
            tjedno: 19,
            mjesecno: 50
          },
          {
            value: false,
            rank: 7,
            imeiprezime: 'Silvio Ilić',
            tjedno: 32,
            mjesecno: 115
          },
          {
            value: false,
            rank: 8,
            imeiprezime: 'Ervin Kovac',
            tjedno: 30,
            mjesecno: 105
          },
          {
            value: false,
            rank: 9,
            imeiprezime: 'Davorin Jurić',
            tjedno: 26,
            mjesecno: 89
          },
          {
            value: false,
            rank: 10,
            imeiprezime: 'David Marković',
            tjedno: 22,
            mjesecno: 74
          },
          {
            value: false,
            rank: 11,
            imeiprezime: 'Dragomir Adamić',
            tjedno: 19,
            mjesecno: 50
          },
          {
            value: false,
            rank: 12,
            imeiprezime: 'Silvio Ilić',
            tjedno: 32,
            mjesecno: 115
          },
          {
            value: false,
            rank: 13,
            imeiprezime: 'Ervin Kovac',
            tjedno: 30,
            mjesecno: 105
          },
          {
            value: false,
            rank: 14,
            imeiprezime: 'Davorin Jurić',
            tjedno: 26,
            mjesecno: 89
          },
          {
            value: false,
            rank: 15,
            imeiprezime: 'David Marković',
            tjedno: 22,
            mjesecno: 74
          },
          {
            value: false,
            rank: 16,
            imeiprezime: 'Dragomir Adamić',
            tjedno: 19,
            mjesecno: 50
          }
        ]
      }
    },
    computed: {
      pages () {
        return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
      }
    }
  }
</script>
