import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // variables and collections here
    data_array: [],
    startTime: [],
    endTime: [],
    graph_array:[],
  },

  //changing state of variables 
  mutations: {

	//array state
	ADD_ARRAY(state, event){
		state.data_array.push(event);
	},

	//start time state
	START_TIME(state, event){
		state.startTime.push(event);
	},

	//end time state
	END_TIME(state, event){
		state.endTime.push(event);
	},
  },

  //called in components for saving state
  actions: {

	//array stae
	addArray({commit}, event){
		commit('ADD_ARRAY', event);
	},

	//start time state
	startTime({commit}, event){
		commit('START_TIME', event);
	},

	//end time state
	endTime({commit}, event){
		commit('END_TIME', event);
	},
  },

  //accessing states in components
  getters: {
	data_array: state => state.data_array,
	startTime: state => state.startTime,
	endTime: state => state.endTime,
  }
})