export const APP_TEST = "APP_TEST";
export const APP_SET_USERS = "APP_SET_USERS";
export const APP_GET_TASKS = "APP_GET_TASKS";
export const APP_SET_TASK = "APP_SET_TASK";

export function appTest() {
	return {
		type: APP_TEST
	}
}

export function setUsers( users ) {
	return {
		type: APP_SET_USERS,
		payload: users
	}
}

export function getTasks( userId ) {
	return {
		type: APP_GET_TASKS,
		payload: userId
	}
}

export function setTask( payload ) {
	return {
		type: APP_SET_TASK,
		payload
	}
}