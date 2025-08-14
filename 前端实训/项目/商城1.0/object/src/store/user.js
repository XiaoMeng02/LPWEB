import {
	defineStore
} from "pinia"


const useUser = defineStore("user", {
	state: () => {
		return {
			userMessage: null
		}
	},
	getters: {

	},
	actions: {

	}
});


export default useUser;