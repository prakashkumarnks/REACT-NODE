import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';




export const ServerApi = 'http://localhost:8082';
export function httpverbspost(api, Parameter) {
	return new Promise((resolve, reject) => {
		axios.post(ServerApi + api, Parameter)
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				return reject(error);
			});

	});
}

export function httpverbsInsertForm(api, Formdata) {
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url: ServerApi + api,
			data: Formdata,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
			.then((response) => {
				resolve(response);
			})
			.catch(function (error) {
				return reject(error);
			});
	});
}

export async function Awaitusesample(api, Formdata) {
	let promise = new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url: ServerApi + api,
			data: Formdata,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
			.then((response) => {
				resolve(response);
			})
			.catch(function (error) {
				return reject(error);
			});
	});

	let result = await promise; // wait until the promise resolves (*)
	return result;
}

export function SessionNotSet() {
	var loggoed = localStorage.getItem("loggoed");
	if (!loggoed) {
		return <Redirect to='/login' />
	}
}


