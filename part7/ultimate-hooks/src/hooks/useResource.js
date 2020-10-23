import axios from 'axios'
import { useEffect, useState } from 'react'

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        axios
            .get(baseUrl)
            .then(response =>
                setResources(response.data)
            )
            .catch(() => setResources([])
            )
    }, [baseUrl])

    const create = async (resource) => {
        const { data } = await axios.post(baseUrl, resource)
        setResources([...resources, data])
    }

    const getAll = async () => {
        const { data } = await axios.get(baseUrl)
        setResources([...resources, data])
    };

    const update = async (id, newObject) => {
        const { data } = await axios.put(`${baseUrl} /${id}`, newObject)
        setResources([...resources, data])
    }

    const service = {
        create,
        getAll,
        update
    }

    return [resources, service]
}

export default useResource;