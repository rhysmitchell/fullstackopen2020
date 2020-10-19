import React, { useState } from 'react'
import { useField } from './hooks/useField'
import { useCountries } from './hooks/useCountries'
import Countries from './components/Countries'

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const countries = useCountries(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>Find</button>
      </form>

      <Countries countries={countries} />
    </div>
  )
}

export default App