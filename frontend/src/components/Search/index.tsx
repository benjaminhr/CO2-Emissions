import React, { Component } from 'react'
import { AppContextInterface, AppContextConsumer } from '../AppContext'

const Search = () => {
  return (
    <AppContextConsumer>
      {appContext => appContext && (
        <input 
          placeholder="Japan"
          type="text"
          onChange={e => appContext.change('value', e.currentTarget.value)}
        />
      )}
    </AppContextConsumer>
  )
}

export default Search