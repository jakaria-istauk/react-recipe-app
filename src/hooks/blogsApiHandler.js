import { defer } from "react-router-dom";

const baseUrl = 'http://wp-api.test/wp-json/wp/v2';

export const getPost = async (params) => {
    let url = baseUrl + '/posts';

	if (params?.id) {
		url = url + '/' + params.id;
	}

    let apiData = await fetch(url).then(( res ) => {
		if( ! res.ok ) {
			throw new Error('Data fetching error');
		}

		return res;
	}).then((res) => res.json());

    return apiData;
}