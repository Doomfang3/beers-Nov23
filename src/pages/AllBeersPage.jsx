import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Search from '../components/Search'
import beersJSON from './../assets/beers.json'

function AllBeersPage() {
  // Mock initial state, to be replaced by data from the API. Once you retrieve the list of beers from the Beers API store it in this state variable.
  const [beers, setBeers] = useState(beersJSON)
  const [searchTerm, setSearchTerm] = useState('')
  const [timeoutId, setTimeoutId] = useState()

  // TASKS:
  // 1. Set up an effect hook to make a request to the Beers API and get a list with all the beers.
  // 2. Use fetch to make a HTTP request.
  // 3. Use the response data from the Beers API to update the state variable.

  const fetchBeers = async query => {
    let endpoint = 'https://ih-beers-api2.herokuapp.com/beers'
    if (query) {
      endpoint += `/search?q=${query}`
    }
    try {
      const response = await fetch(endpoint)
      if (response.ok) {
        const beersData = await response.json()
        setBeers(beersData)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchBeers()
  }, [])

  useEffect(() => {
    clearTimeout(timeoutId)
    if (searchTerm) {
      setTimeoutId(
        setTimeout(() => {
          fetchBeers(searchTerm)
        }, 500)
      )
    }
  }, [searchTerm])

  // The logic and the structure for the page showing the list of beers. You can leave this as it is for now.
  return (
    <>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className='d-inline-flex flex-wrap justify-content-center align-items-center w-100 p-4'>
        {beers &&
          beers.map((beer, i) => {
            return (
              <div key={i}>
                <Link to={'/beers/' + beer._id}>
                  <div
                    className='card m-2 p-2 text-center'
                    style={{ width: '24rem', height: '18rem' }}
                  >
                    <div className='card-body'>
                      <img
                        src={beer.image_url}
                        style={{ height: '6rem' }}
                        alt={'image of' + beer.name}
                      />
                      <h5 className='card-title text-truncate mt-2'>{beer.name}</h5>
                      <h6 className='card-subtitle mb-3 text-muted'>
                        <em>{beer.tagline}</em>
                      </h6>
                      <p className='card-text'>Created by: {beer.contributed_by}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default AllBeersPage
