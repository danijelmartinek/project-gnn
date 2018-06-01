<template>
	<div>
		<br />
		<br />
		<v-flex xs12 sm5>
			<v-card>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card>
							<v-toolbar color="white" class="elevation-1">
								<v-flex xs12>
									<v-card-title class="title"><b>VREMENSKI RASPONI</b></v-card-title>
								</v-flex>
								<v-spacer></v-spacer>
								<v-btn icon @click="timePickerModal = true">
									<v-icon class="grey--text text--darken-2" style="font-size: 3em;">add</v-icon>
								</v-btn>
							</v-toolbar>
							<v-list>
								<template v-for="(interval, index) in timeBox">
									<v-list-tile avatar :inactive="true" @click="">
										<v-list-tile-content>
											<v-list-tile-title class="title grey--text text--darken-2">{{ interval.start }} <span> - </span> {{ interval.end }}</v-list-tile-title>
										</v-list-tile-content>

										<v-list-tile-action >
											<v-btn icon class="mx-0" @click="editTime(index)">
												<v-icon color="blue">mode_edit</v-icon>
											</v-btn>
										</v-list-tile-action>
										<v-list-tile-action >
											<v-btn icon class="mx-0" @click="deleteTime(index)">
												<v-icon color="pink">delete</v-icon>
											</v-btn>
										</v-list-tile-action>
									</v-list-tile>
									<v-divider></v-divider>
								</template>
							</v-list>

							<v-flex xs11 sm5>
								<v-dialog
									class="light-blue darken-1"
									ref="dialog"
									persistent
									v-model="timePickerModal"
									lazy
									full-width
									width="290px"
									:return-value.sync="time"
								>

									<v-card class="light-blue darken-1" dark><v-card-title class="title"><b>{{ timePickerText }}</b></v-card-title></v-card>
									<v-time-picker color="light-blue darken-1" v-model="time" format="24hr" :min="minTime">
										<v-spacer></v-spacer>
										<v-btn flat color="primary" @click="cancelTimeInput()">Cancel</v-btn>
										<span v-if="inputControl == 'start'">
											<v-btn flat color="primary" @click="setTimeStart()">OK</v-btn>
										</span>
										<span v-else-if="inputControl == 'end'">
											<v-btn flat color="primary" @click="setTimeEnd()">OK</v-btn>
										</span>
									</v-time-picker>
								</v-dialog>
							</v-flex>
						</v-card>
					</v-flex>

				</v-layout>
			</v-card>
		</v-flex>
	</div>
</template>

<script>
/*eslint-disable*/
import axios from 'axios'
import qs from 'qs'

export default {
  name: "timeBox",
  data() {
    return {
			time: null,
			startTime: null,
			endTime: null,
			minTime: null,

			editMode: false,
			editTimeIndex: null,
			timePickerModal: false,
			inputControl: "start",
			timePickerText: "POČETAK",

			timeBox: []
    };
	},

	created() {
		const intervals = JSON.parse(JSON.stringify(this.$store.state.userGroup.timeBox));
		this.timeBox = intervals;
	},
	
	methods: {
		setTimeStart() {
			this.startTime = this.time;
			
			this.minTime = this.time;
			this.timePickerModal = false;
			this.time = null;

			this.timePickerModal = true;
			this.timePickerText = "KRAJ";
			this.inputControl = "end";

			if(this.editMode == true){
				this.time = this.timeBox[this.editTimeIndex].end;
			}
		},

		setTimeEnd() {

			this.endTime = this.time;

			if(this.editMode == true){
				this.timeBox[this.editTimeIndex].start = this.startTime;
				this.timeBox[this.editTimeIndex].end = this.endTime;

				this.editMode = false;
				this.editTimeIndex = null;
			}
			else{
				this.timeBox.push({start: this.startTime, end: this.endTime});
			}

			this.minTime = null;
			this.timePickerModal = false;

			setTimeout(function () {
				this.timePickerText = "POČETAK";
				this.inputControl = "start";
				this.time = null;
			}.bind(this), 200);


			const updatedGroup = this.$store.state.userGroup;

			if(this.timeBox[0]){
        updatedGroup.timeBox = this.timeBox;
      }
      else{
        updatedGroup.timeBox = [];
      }

			axios.post('/api/update_group', qs.stringify(updatedGroup))
				.then(function (response) {})
				.catch(function (error) {
					console.log(error);
			});
		},

		cancelTimeInput() {
			this.minTime = null;
			this.timePickerModal = false;

			setTimeout(function () {
				this.timePickerText = "POČETAK";
				this.inputControl = "start";
				this.time = null;
			}.bind(this), 200);

		},

		editTime(index) {
			this.editMode = true;
			this.time = this.timeBox[index].start;
			this.editTimeIndex = index;

			this.timePickerModal = true;
		},

		deleteTime(index) {
			this.timeBox.splice(index, 1);


			const updatedGroup = this.$store.state.userGroup;

			if(this.timeBox[0]){
        updatedGroup.timeBox = this.timeBox;
      }
      else{
        updatedGroup.timeBox = [];
      }

			axios.post('/api/update_group', qs.stringify(updatedGroup))
				.then(function (response) {})
				.catch(function (error) {
					console.log(error);
			});
		}
	}
}
</script>

<style scoped>

</style>
