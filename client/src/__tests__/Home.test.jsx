import {render, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../components/Home'

afterEach(() => {
  cleanup()
})

test('loads and displays header and message', async () => {
  //ARRANGE 

  render(<Home />)

  //ACT

  await screen.findByRole('heading')
  await screen.findByRole('paragraph')

  //ASSERT 
  expect(screen.getByRole('heading')).toHaveTextContent('Welcome to my Blog with AI generated images!')
  expect(screen.getByRole('paragraph')).toHaveTextContent('This blog is a place to post stories about my life!')
})
