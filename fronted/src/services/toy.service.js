
import {httpService} from './http.service.js'
import { utilService } from './util.service.js'
import axios from 'axios' //CR from node modules also npm install

const KEY = 'toysDB';
const TOY_URL = 'toy/'; //heroku


export const toyService = {
    query,
    queryAll,
    getById,
    remove,
    save,
    getEmptyToy,
    nextPage,
    getPage,
    prevPage
}

function nextPage() {
    gFilterBy.pageIdx++
}
function getPage() {
    return gFilterBy.pageIdx
}
function prevPage() {
    gFilterBy.pageIdx--
}

var gToys = _createToys()

// TOY: support paging and filtering and sorting
function query(filterBy) {
    var params = new URLSearchParams(filterBy).toString();
    return httpService.get(TOY_URL + '?' + params)
}

function queryAll() {
    return httpService.get(TOY_URL)
}


function getById(id) {
    // return axios.get(TOY_URL + id).then(res => res.data)
    return httpService.get(TOY_URL+ id)
}

function remove(id) {
    return httpService.delete(TOY_URL+ id)
}

function save(toy) {
    if (toy._id) {
        // return axios.put(TOY_URL + toy._id, toy).then(res => res.data)//update        
        return httpService.put(TOY_URL+ toy._id , toy)
    } else {
        // return axios.post(TOY_URL, toy).then(res => res.data)//add
        return httpService.post(TOY_URL , toy)
    }
}


function getEmptyToy(fullName) {
    return {name: '',price: 50,
            toyType: 'funny',createdAt:0, inStock: true }
            // toyType: 'funny',createdAt: Date.now(), inStock: true }
}

function _createToys() {
    var toys = JSON.parse(localStorage.getItem(KEY))
    if (!toys || !toys.length) {
        toys = [
            _createToy({"_id": "t101", "name": "Talking Doll","price": 123,
                        "type": "funny","createdAt": 1599873242736,"inStock": true }),

            _createToy({"_id": "t102", "name": "Fire car","price": 444,
                        "type": "funny","createdAt": 1599873242747,"inStock": false }),
        ]
        localStorage.setItem(KEY, JSON.stringify(toys))
    }
    return toys;
}

function _createToy(toy) {
    return {
        // _id: utilService.makeId(),//??????????
        ...toy
    }
}

