export const selectUser = (state) => state.user.user
export const selectIsLoading = (state) => state.user.isLoading
export const selectError = (state) => state.user.error

export const selectPhotoURL = (state) => state.user.user?.photoURL

