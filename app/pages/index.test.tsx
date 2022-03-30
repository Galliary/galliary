import { render } from 'test/utils'

import { useCurrentUser } from 'app/data/hooks/useCurrentUser'
import Home from './index'

jest.mock('app/core/hooks/useCurrentUser')
const mockUseCurrentUser = useCurrentUser as jest.MockedFunction<
  typeof useCurrentUser
>

test.skip('renders blitz documentation link', () => {
  // This is an example of how to ensure a specific item is in the document
  // But it's disabled by default (by test.skip) so the test doesn't fail
  // when you remove the the default content from the page

  // This is an example on how to mock api hooks when testing
  mockUseCurrentUser.mockReturnValue({
    id: 'a',
    username: 'synqat',
    nickname: 'Synqat',
    avatarUrl: '#',
    avatarSourceId: '#',
  })

  const { getByText } = render(
    <Home
      currentUser={mockUseCurrentUser()}
      initialData={{
        count: 0,
        albums: [],
        hasMore: false,
        nextPage: { skip: 0, take: 0 },
      }}
    />,
  )
  const linkElement = getByText(/Documentation/i)
  expect(linkElement).toBeInTheDocument()
})
