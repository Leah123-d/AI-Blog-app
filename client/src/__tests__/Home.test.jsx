import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../components/Home'

test('loads and displays message', async () => {
  //ARRANGE 

  render(<Home />)

  //ACT

  await screen.findByRole('heading')

  //ASSERT 
  expect(screen.getByRole('heading')).toHaveTextContent('Welcome to my Blog!')
})
