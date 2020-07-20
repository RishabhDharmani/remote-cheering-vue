import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // variables and collections here
    data_array: [],
    startTime: 0,
    endTime: 0
  },

  mutations: {
	ADD_ARRAY(state, event){
		state.data_array.push(event);
	},

	START_TIME(state, event){
		state.startTime = event;
	},

	END_TIME(state, event){
		state.endTime = event;
	},
  },

  actions: {
	addArray({commit}, event){
		commit('ADD_ARRAY', event);
	},

	startTime({commit}, event){
		commit('START_TIME', event);
	},

	endTime({commit}, event){
		commit('END_TIME', event);
	},
  },

  getters: {
	data_array: state => state.data_array,
	startTime: state => state.startTime,
	endTime: state => state.endTime,
  }
})