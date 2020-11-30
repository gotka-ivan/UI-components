import Fetch from '@src/tools/fetch.js'
const fetch =  new Fetch()
class FamilyApi {
    familyAdd(family) {
        return fetch.post('/api/family/add',{family})
    }
    familyList() {
        return fetch.get('/api/family/list')
    }
    familyDelete(id) {
        return fetch.post('/api/family/delete',{id})
    }
    familyInfo(id) {
        return fetch.post('/api/family/info',id)
    }
}

export default FamilyApi


