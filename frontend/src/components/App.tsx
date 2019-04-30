import React, { Component } from 'react'
import { AppContextInterface, AppContextProvider } from './AppContext'
import Search from './Search'
import SubmitButton from './Button/SubmitButton'
import EmissionsData from './EmissionsData'

import mapboxgl, { MapMouseEvent } from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/index.css'

type StateKeys = keyof AppContextInterface

class App extends Component<{}, AppContextInterface> {
  state: AppContextInterface = {
    change: (key: StateKeys, val: string) => this.setState({ 
      [key]: val 
    } as any),
    value: '',
    map: null,
    currentCordinates: [],
    emissionsData: [{
      countryName: '',
      key: '',
      year: '',
      value: ''
    }]
  }

  search = async (e: any): Promise<any> => {
    e.preventDefault()

    try {
      const request = await fetch('/info/' + this.state.value)
      const countryInfo = await request.json()
      const latitude: number = countryInfo["latlng"][0]
      const longitude: number = countryInfo["latlng"][1]
      
      // set long and lat
      const map = this.state.map as any
      map.setCenter([ longitude, latitude ])
      this.setState({ 
        map,
        currentCordinates: [ longitude, latitude ]
      })

      // create marker at given location
      const marker = new mapboxgl.Marker()
        .setLngLat([ longitude, latitude ])
        .addTo(this.state.map as any);

      const emissions = await fetch('/emissions/' + this.state.value)
      const json = await emissions.json()
      this.setState({
        emissionsData: json
      })

    } catch(e) {
      console.error(e)
    }
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2NpZW50aWEiLCJhIjoiY2p1bGpoYzFjMjBvaDN5cWprancxbHJseCJ9.95cmw8IwG6XxiQegWoKAZw';
    this.setState({
      map: new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [24.9384, 60.1699], 
        zoom: 5
      })
    })
  }

  render() {
    return (
      <AppContextProvider value={this.state}>
        <div className="modal">
          <h1 id="title">CO2 Emissions</h1>
          <form>
            <Search />
            <SubmitButton text="🔎" onClick={this.search} />
          </form>
          <EmissionsData data={this.state.emissionsData} />
        </div>
        <div id="map"></div>

      </AppContextProvider>
    )
  }
}

export default App