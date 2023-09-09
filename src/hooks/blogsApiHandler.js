import axios from "axios";

axios.defaults.baseURL = 'http://wp-api.test/wp-json/wp/v2';

export const getPost = async (params) => {
    let url = '/posts';
	let query_params = {};

	if (params?.id) {
		url = url + '/' + params.id;
	}
	if(params?.per_page){
		query_params.per_page = params?.per_page;
	}
	if(params?.page){
		query_params.page = params?.page;
	}

    let apiData = await axios.get(url,{params:query_params}).then(( res ) => {
		return res;
	}).catch((res) => {
		// console.log(res, 'catch');
	});

    return apiData?.data;
}