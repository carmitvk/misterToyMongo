
// import { storageService } from './async-storage.service.js'
// import {storageService} from './storage.service.js'
import { utilService } from './util.service.js'
// const axios = require('axios') CR
import axios from 'axios' //CR from node modules also npm install

const KEY = 'toysDB';
const TOY_URL = '//localhost:3030/api/toy/'; //heroku


// const TOY_URL = (process.env.NODE_ENV !== 'development')//heroku
//  ? '/api/toy'
//  : '//localhost:3000/api/toy';

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
    return axios.get(TOY_URL, { params: filterBy })
        .then(res => res.data)
}

function queryAll() {
    return axios.get(TOY_URL)
        .then(res => res.data)
}


function getById(id) {
    ////return storageService.get(KEY, id)
    return axios.get(TOY_URL + id).then(res => res.data)
    // var res = gToys.find(toy => toy._id === id)
    // console.log(res)
    // return res
}

function remove(id) {
    // const idx = gToys.findIndex(toy => toy._id === id)
    // gToys.splice(idx, 1)
    // storageService.store(KEY, gToys)
    // return gToys //carmit temp
    ///// return storageService.remove(KEY, id)
    return axios.delete(TOY_URL + id).then(res => res.data)
}

function save(toy) {
    // const savedToy = (toy._id) ? _update(toy) : _add(toy)
    // storageService.store(KEY, gToys)
    //////const savedToy = (toy._id) ? storageService.put(KEY, toy) : storageService.post(KEY, toy)
    //////return savedToy;
    if (toy._id) {
        return axios.put(TOY_URL + toy._id, toy).then(res => res.data)//update
    } else {
        return axios.post(TOY_URL, toy).then(res => res.data)//add
    }
}


// function _add(toy) {
//     toy._id = utilService.makeId()
//     gToys.push(toy)
//     storageService.store(KEY, gToys)
//     return toy
// }

// function _update(toy) {
//     const idx = gToys.findIndex(currToy => currToy._id === toy._id)
//     gToys.splice(idx, 1, toy)
//     storageService.store(KEY, gToys)
//     return toy
// }

function getEmptyToy(fullName) {
    return {_id: '', name: '',price: 50,
            toyType: 'funny',createdAt: Date.now(), inStock: true }
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
        _id: utilService.makeId(),
        ...toy
    }
}

