import {toyService} from '../services/toy.service.js'

export const toyStore = {
    state: {
        filterBy: {
            name: '',
            inStock:true,
            toyType:['all'],
            sortBy:'name',
            pageIdx:0,
            pageSize:3,
        },
        toys: [],
        allToys:[],
        loading:false,
        totalNumOfToys:0,
    },
    getters: {
        toysCountByType(state){
            console.log('state.toys==',state.allToys)
            let baby = state.allToys.filter(toy => toy.toyType === 'baby');
            console.log('baby==',baby)

            let babyPriceSum = baby.reduce((acc, value) => {
                                                return acc + value.price
                                                           }, 0)

            const funny = state.allToys.filter(toy => toy.toyType === 'funny');
            let funnyPriceSum = funny.reduce((acc, value) => {
                                                return acc + value.price
                                                             }, 0)

            return [babyPriceSum / baby.length, funnyPriceSum / funny.length]
        },

        toysInStockByType(state){
            let baby = state.allToys.filter(toy => toy.toyType === 'baby' && toy.inStock === true);
            const funny = state.allToys.filter(toy => toy.toyType === 'funny' && toy.inStock === true);
            return [baby.length, funny.length]
        },
        pageIdx(state){
            return state.filterBy.pageIdx;
        },

        filterBy(state){
            return state.filterBy;
        },

        loading(state){
            return state.loading;
        },

        toys(state){
            return state.toys;//copy neede???
        },

        doneToysNum(state) {
            return state.toys.reduce((numOfDoneToys,toy)=>{
                if (toy.status==='done'){
                    numOfDoneToys++
                }
                console.log('numOfDoneToys==',numOfDoneToys)
                return numOfDoneToys
            },0)
        }
    },
    mutations: {
        setToys(state, {data}) {
            state.toys = data.toys;
            state.totalNumOfToys = data.totalNumOfToys;
        },
        setAllToys(state, {data}) {
            state.allToys = data.toys;
        },
        setLoadingState(state, payload){
            state.loading = payload.isLoading;
        },

        setFilterBy(state, { filter }) {
            state.filterBy = filter;
        },

        removeStoreToy(state,  {payload} ) {
            const idx = state.toys.findIndex(td => td._id === payload.toyId)
            state.toys.splice(idx, 1)
        },

        addToy(state, { savedToy }) {
            const idx = state.toys.findIndex((td) => td._id === savedToy._id);
            if (idx < 0) {
                console.log('Error in addToy');
            } else {
                state.toys.splice(idx, 1, savedToy);
            }
        },
    },
    actions: {
        loadToys(contex, payload) {
            var showLoading = payload.showLoading || false;
           contex.commit({ type: 'setLoadingState', isLoading:showLoading });
            toyService.query(payload.filter || contex.state.filterBy)
                .then(data => {
                    contex.commit({ type: 'setToys', data });
                    contex.commit({ type: 'setLoadingState', isLoading:false });
                })
                .catch(err=>{
                    contex.commit({ type: 'setLoadingState', isLoading:false });
                    console.log('Store: Cannot load toys..', err);
                    throw new Error('Cannot load toys..');
                })
            // this.dispatch({ type: 'getQuery' })
        },

        // getQuery(contex, payload){
            
        // },

        saveToy(contex, payload) {
            toyService.save(payload.toy)
                .then(savedToy => {
                    contex.commit({ type: 'addToy', savedToy });
                    this.dispatch({ type: 'loadToys', filter:contex.state.filterBy});
                })
                .catch(err => {
                    console.log('Store: Cannot save toy', err);
                    throw new Error('Cannot save toy');
                })
        },

        removeToy(contex, payload) {
            toyService.remove(payload.toyId)
                .then(removedToy => {
                    contex.commit({ type: 'removeStoreToy', payload });
                })
                .catch(err => {
                    console.log('Store: Cannot remove toy', err);
                    throw new Error('Cannot remove toy');
                })
        },

        setFilter(contex, { filterBy }) {
            var filter = JSON.parse(filterBy);
            filter.pageIdx = 0;
            contex.commit({ type: 'setFilterBy', filter });
            this.dispatch({ type: 'loadToys', filter })
        },

        setPageIndex(contex, { pageDiff }) {
            var pageIdx = contex.state.filterBy.pageIdx + pageDiff;
            if(pageIdx >= 0 && pageIdx < (Math.ceil(contex.state.totalNumOfToys/ contex.state.filterBy.pageSize))){
                var filter = {...contex.state.filterBy, pageIdx };
                contex.commit({ type: 'setFilterBy', filter });
                this.dispatch({ type: 'loadToys', filter });
            }
        },
        // toysCountByType()
        loadAllToys(contex, payload) {
            var showLoading = payload.showLoading || false;
            contex.commit({ type: 'setLoadingState', isLoading:showLoading });
            toyService.queryAll()
                .then(data => {
                    contex.commit({ type: 'setAllToys', data });
                    contex.commit({ type: 'setLoadingState', isLoading:false });
                })
                .catch(err=>{
                    contex.commit({ type: 'setLoadingState', isLoading:false });
                    console.log('Store: Cannot load toys..', err);
                    throw new Error('Cannot load toys..');
                })
            // this.dispatch({ type: 'getQuery' })
        },

    }

}