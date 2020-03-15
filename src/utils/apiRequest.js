import axios from 'axios'
import {
    RANDOM_MASK_USAGE_INSTRUCTION,
    AFFECTED_COUNTRIES,
    CASES_BY_COUNTRY,
    WORLD_TOTAL_STAT
} from './api'

export const getMaskUsageInstruction = async() => {
    const data = await networkRequest(RANDOM_MASK_USAGE_INSTRUCTION)
    return data
}

export const getAffectedCountries = async() => {
    const data = await networkRequest(AFFECTED_COUNTRIES)
    return data
}

export const getCasesByCountry = async() => {
    const data = await networkRequest(CASES_BY_COUNTRY)
    return data
}

export const getWorldTotalStat = async() => {
    const data = await networkRequest(WORLD_TOTAL_STAT)
    return data
}

const networkRequest = async(url) => {
   const options = {
        headers: {
            'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
            'x-rapidapi-key': 'b6c318369fmsh871b89834525a6bp1c28b4jsn745eb3d628e6'
        }
    }
    try{
        const response = await axios.get(url, options)
        return response.data
    }
    catch(error){
        return error.message
    }
}