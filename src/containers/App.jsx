import React, { useMemo, useState } from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import { robots } from '../robots'
import './App.css'

const App = () => {
  const [searchfield, setSearchfield] = useState('')

  const filtered = useMemo(
    () => robots.filter(r => r.name.toLowerCase().includes(searchfield.toLowerCase())),
    [searchfield]
  )

  return (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchfield={searchfield} searchChange={e => setSearchfield(e.target.value)} />
      <Scroll>
        <CardList robots={filtered} />
      </Scroll>
    </div>
  )
}

export default App
