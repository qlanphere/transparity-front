import { renderHook, act } from '@testing-library/react-hooks'
import { AuthProvider, useAuthContext } from '.'

import 'jest-localstorage-mock';

describe('useAuthContext', () => {
    let wrapper;

    beforeEach(() => {
        jest.resetAllMocks()
        wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>
    })

    test('retrieves the token from local storage', async () => {
        renderHook(() => useAuthContext(), { wrapper })
        expect(localStorage.getItem).toHaveBeenCalledWith('token')
    })

    test('logout should clear localStorage', async () => {
        const { result } = renderHook(() => useAuthContext(), { wrapper })
        act(() => result.current.logout())
        expect(localStorage.clear).toHaveBeenCalled();
    })
})