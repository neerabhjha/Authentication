import React, { useEffect } from 'react'
import { axiosClient } from '../axiosClient';

function Home() {

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const response = axiosClient.get('/home/private');
    console.log('got the response', response);
  }
  return (
    <div>
      <abbr title='Neerabh Kumar'>Home</abbr>
      <mark>Hey!!</mark>
      <div>
        <h1>Title</h1>
        <details>
          <summary>New Title</summary>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, explicabo illo. Ab non,
            repellat at eveniet repellendus voluptate veritatis! <code>Iste quas quibusdam </code> laboriosam, asperiores reprehenderit
            <s> cum labore commodi</s> accusantium doloremque!</p>
        </details>
      </div>
    </div>
  )
}

export default Home