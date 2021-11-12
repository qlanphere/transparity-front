import { screen } from '@testing-library/react';
import { LoggedOutRoute, PrivateRoute } from '.';

const TestComp = () => <h1>Just Testing</h1>

describe('LoggedOutRoute', () => {
    test('it renders the route if no-one has logged in', () => {
        renderWithProviders(<LoggedOutRoute><TestComp/></LoggedOutRoute>)
        const publicHeading = screen.getByText("Just Testing")
        expect(publicHeading).toBeInTheDocument()
    })
})

describe('PrivateRoute', () => {
    test('it does not render the route if no-one has logged in', () => {
        renderWithProviders(<PrivateRoute><TestComp /></PrivateRoute>)
        const privateHeading = screen.queryByText("Just Testing")
        expect(privateHeading).not.toBeInTheDocument()
    })
})