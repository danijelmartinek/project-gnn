<template>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="dialog = true"><v-icon>edit</v-icon></v-btn></div>
        <v-dialog v-model="dialog" absolute max-width="600">
            <v-card>
                <v-card-title>
                    <span class="headline">UREDI PROFIL</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click.native="dialog = false"><v-icon>close</v-icon></v-btn>
                </v-card-title>
                <div class="divider"></div>
                <v-layout row wrap>
                    <v-flex xs10 offset-xs1>
                        <v-form class="pa-2" ref="form" v-model="valid" lazy-validation>
													<v-text-field
														v-model="username"
														:rules="usernameRules"
														:counter="10"
														label="Koriničko ime"
														required
													></v-text-field>
													<v-text-field
														v-model="firstName"
														label="Ime"
													></v-text-field>
													<v-text-field
														v-model="lastName"
														label="Prezime"
													></v-text-field>
													<v-text-field
														v-model="email"
														:rules="emailRules"
														label="E-mail"
														required
													></v-text-field>
													<v-text-field
														v-model="city"
														label="Grad"
													></v-text-field>
													<v-select
														v-model="countrySelect"
														:items="countryList"
														label="Država"
													></v-select>
													<v-text-field
														v-model="bio"
														label="Bio"
														multi-line
													></v-text-field>
													<v-select
														v-model="groupSelect"
														:items="groups"
														label="Organizacija"
														required
													></v-select>

													<v-btn
														:disabled="!valid"
														@click="submit"
													>
														potvrdi
													</v-btn>
													<v-btn @click="clear">očisti</v-btn>
												</v-form>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>
    </v-card-actions>
</template>

<script>
/*eslint-disable*/

import axios from 'axios'
import qs from 'qs'

export default {
	name: 'editProfile',
	data: () => ({
		dialog: false,
		valid: true,
		username: '',
		usernameRules: [
			v => !!v || 'Napišite željeno korisničko ime',
			v => (v && v.length <= 10) || 'Korisničko ime može imati najviše 10 znakova',
			v => (v && v.length >= 4) || 'Korisničko ime mora imati najmanje 4 znaka',
		],
		existUsernames: [],
		firstName: '',
		lastName: '',
		email: '',
		emailRules: [
			v => !!v || 'E-mail je obavezan',
			v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail mora biti točan'
		],
		existEmails: [],
		city: '',
		countrySelect: null,
		countryList: ["AFGHANISTAN","ALBANIA","ALGERIA","ANDORRA","ANGOLA","ANGUILLA","ANTIGUA &AMP; BARBUDA","ARGENTINA","ARMENIA","ARUBA","AUSTRALIA","AUSTRIA","AZERBAIJAN","BAHAMAS"
		,"BAHRAIN","BANGLADESH","BARBADOS","BELARUS","BELGIUM","BELIZE","BENIN","BERMUDA","BHUTAN","BOLIVIA","BOSNIA &AMP; HERZEGOVINA","BOTSWANA","BRAZIL","BRITISH VIRGIN ISLANDS"
		,"BRUNEI","BULGARIA","BURKINA FASO","BURUNDI","CAMBODIA","CAMEROON","CANADA","CAPE VERDE","CAYMAN ISLANDS","CHAD","CHILE","CHINA","COLOMBIA","CONGO","COOK ISLANDS","COSTA RICA"
		,"COTE D IVOIRE","CROATIA","CRUISE SHIP","CUBA","CYPRUS","CZECH REPUBLIC","DENMARK","DJIBOUTI","DOMINICA","DOMINICAN REPUBLIC","ECUADOR","EGYPT","EL SALVADOR","EQUATORIAL GUINEA"
		,"ESTONIA","ETHIOPIA","FALKLAND ISLANDS","FAROE ISLANDS","FIJI","FINLAND","FRANCE","FRENCH POLYNESIA","FRENCH WEST INDIES","GABON","GAMBIA","GEORGIA","GERMANY","GHANA"
		,"GIBRALTAR","GREECE","GREENLAND","GRENADA","GUAM","GUATEMALA","GUERNSEY","GUINEA","GUINEA BISSAU","GUYANA","HAITI","HONDURAS","HONG KONG","HUNGARY","ICELAND","INDIA"
		,"INDONESIA","IRAN","IRAQ","IRELAND","ISLE OF MAN","ISRAEL","ITALY","JAMAICA","JAPAN","JERSEY","JORDAN","KAZAKHSTAN","KENYA","KUWAIT","KYRGYZ REPUBLIC","LAOS","LATVIA"
		,"LEBANON","LESOTHO","LIBERIA","LIBYA","LIECHTENSTEIN","LITHUANIA","LUXEMBOURG","MACAU","MACEDONIA","MADAGASCAR","MALAWI","MALAYSIA","MALDIVES","MALI","MALTA","MAURITANIA"
		,"MAURITIUS","MEXICO","MOLDOVA","MONACO","MONGOLIA","MONTENEGRO","MONTSERRAT","MOROCCO","MOZAMBIQUE","NAMIBIA","NEPAL","NETHERLANDS","NETHERLANDS ANTILLES","NEW CALEDONIA"
		,"NEW ZEALAND","NICARAGUA","NIGER","NIGERIA","NORWAY","OMAN","PAKISTAN","PALESTINE","PANAMA","PAPUA NEW GUINEA","PARAGUAY","PERU","PHILIPPINES","POLAND","PORTUGAL"
		,"PUERTO RICO","QATAR","REUNION","ROMANIA","RUSSIA","RWANDA","SAINT PIERRE &AMP; MIQUELON","SAMOA","SAN MARINO","SATELLITE","SAUDI ARABIA","SENEGAL","SERBIA","SEYCHELLES"
		,"SIERRA LEONE","SINGAPORE","SLOVAKIA","SLOVENIA","SOUTH AFRICA","SOUTH KOREA","SPAIN","SRI LANKA","ST KITTS &AMP; NEVIS","ST LUCIA","ST VINCENT","ST. LUCIA","SUDAN"
		,"SURINAME","SWAZILAND","SWEDEN","SWITZERLAND","SYRIA","TAIWAN","TAJIKISTAN","TANZANIA","THAILAND","TIMOR L'ESTE","TOGO","TONGA","TRINIDAD &AMP; TOBAGO","TUNISIA"
		,"TURKEY","TURKMENISTAN","TURKS &AMP; CAICOS","UGANDA","UKRAINE","UNITED ARAB EMIRATES","UNITED KINGDOM","UNITED STATES","UNITED STATES MINOR OUTLYING ISLANDS","URUGUAY","UZBEKISTAN","VENEZUELA","VIETNAM","VIRGIN ISLANDS (US)"
		,"YEMEN","ZAMBIA","ZIMBABWE"],
		bio: '',
		groupSelect: null,
		groups: [],
	}),

	created () {
		this.initialize();
		
		var v = v => (this.existUsernames.includes(this.username) != true) || 'Korisničko ime je zauzeto';
		this.usernameRules.push(v);

		var v2 = v => (this.existEmails.includes(this.email) != true) || 'Ova email adresa već postoji';
		this.emailRules.push(v2);
  },
	
	methods: {

		initialize () {
      axios.get(`/api/users`)
      .then(response => {
				var t = this;

				response.data.forEach(function(user){
					t.existUsernames.push(user.username);
					t.existEmails.push(user.email);
				})

				function remove(array, element) {
						const index = array.indexOf(element);
						array.splice(index, 1);
				}

				remove(this.existUsernames, this.$store.state.authUser.username);
				remove(this.existEmails, this.$store.state.authUser.email);

				this.username = this.$store.state.authUser.username;
				this.firstName = this.$store.state.authUser.firstName;
				this.lastName = this.$store.state.authUser.lastName;
				this.email = this.$store.state.authUser.email;
				this.city = this.$store.state.authUser.city;
				this.bio = this.$store.state.authUser.userBio;

				var selectedCountryIndex = this.countryList.indexOf(this.$store.state.authUser.state);
				this.countrySelect = this.countryList[selectedCountryIndex];
			})
			
			axios.get(`/api/activity/groups`)
      .then(response => {
				var t = this;

				response.data.forEach(function(group, index){
					t.groups.push({text: group.groupName, id: group._id});

					if(group._id == t.$store.state.authUser.groupId){
						t.groupSelect = t.groups[index];
					}
				})

				this.groups.push({text: '-', id: null});
      })
		},

		submit () {
			if (this.$refs.form.validate()) {

				this.$store.state.authUser.username = this.username;
				this.$store.state.authUser.firstName = this.firstName;
				this.$store.state.authUser.lastName = this.lastName;
				this.$store.state.authUser.email = this.email;
				this.$store.state.authUser.city = this.city;
				this.$store.state.authUser.state = this.countrySelect;
				this.$store.state.authUser.userBio = this.bio;
				this.$store.state.authUser.groupId = this.groupSelect.id;

				this.$emit('updateUserGroup', this.groupSelect);

				var user = this.$store.state.authUser;

				axios.post('/api/update_user', qs.stringify(user))
					.then(function (response) {})
					.catch(function (error) {
						console.log(error);
				});

				this.dialog = false;
				this.$router.push('/profile');
			}
		},

		clear () {
			this.$refs.form.reset();
		}
	}
}
</script>

<style scoped>

</style>