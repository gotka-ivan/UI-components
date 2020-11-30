import FamilyApi from '@src/api/family'

const familyApi =  new FamilyApi()

export const familyAdd = function(family) {
  return familyApi.familyAdd(family)
}

export const familyDelete = function(familyId) {
  return familyApi.familyDelete(familyId)
}


export const familyInfo = function(familyId) {
  return familyApi.familyInfo(familyId)
}

export const familyList = function() {
  return  familyApi.familyList()
}
