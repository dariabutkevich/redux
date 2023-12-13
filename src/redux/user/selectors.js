export const selectUserId = (store) => store.user.data?.id;

export const selectLoading = (store) => store.user.loading;

export const selectUserEmail = (store) => store.user.data?.email;

export const selectUserCreatedAt = (store) => store.user.data?.createdAt;
