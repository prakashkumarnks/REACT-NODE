import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../Assets/pagination.css';
import Button from 'react-bootstrap/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx'
//import Pagination from "react-js-pagination";


export const ServerApi      = 'http://localhost:8083';
export const PerPagelimit   = 10;
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

export async function Fillddl(Query) {
	let promise =  new Promise((resolve, reject) => {
		axios.post(ServerApi + '/Fillddl', { Query: Query })
			.then(response => {
				//	console.log(response.data[1]);
		var keys = Object.keys(response.data);
		console.log(keys);
				resolve(response);
			})
			.catch(error => {
				return reject(error);
			});
	});
	let result = await promise; // wait until the promise resolves (*)
	return result;
}

export function SessionNotSet() {
	var loggoed = localStorage.getItem("loggoed");
	if (!loggoed) {
		return <Redirect to='/' />
	}
}


export function  paginationlink(handlePageClick,count)
{
  const  pageCount = Math.ceil(count / PerPagelimit);
  ///console.log(count);
    return (
            <div className="link">
        
            
            <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={5}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            initialPage={0}
            //  disableInitialCallback = {true}
            />
            </div>
          );
}


export const ExportCSV = ({csvData, fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button variant="warning" onClick={ (e) => exportToCSV(csvData,fileName)}>Export</Button>
    )
}


/*
export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('loggoed');
}
*/