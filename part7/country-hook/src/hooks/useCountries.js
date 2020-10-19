import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountries = (name) => {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        if (name) {
            axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
                .then(response => {
                    setCountries(response.data)
                }, () => setCountries([]))
        }
    }, [name])

    return {
        countries: countries,
        found: (countries.length > 0)
    }
}