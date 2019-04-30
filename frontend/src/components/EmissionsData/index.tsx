import React from 'react'
import { IEmissionsData } from '../AppContext'

function EmissionsData(props: any) {
  return (
    <div className="output">
      {props.data.length > 1 ? (
        props.data.reverse().map((obj: IEmissionsData) => 
          <p><b>{obj.year}</b>: {obj.value}</p>
        )
      ): (
        <p>Search for a country!</p>
      )}
    </div>
  )
}

export default EmissionsData