import axiosClient from '@configs/axiosClient';

export const GameAPI = {
  adminGetListGames(params: any) {
    return axiosClient.get('/admin/matches', { params });
  },
  adminAddNewGame(body: any) {
    return axiosClient.post('/admin/matches', body);
  },
  adminGetDetailGame(id: any) {
    return axiosClient.get(`/admin/matches/${id}`);
  },
  adminGetUserJoinGame(id: any, params: any) {
    return axiosClient.get(`/admin/matches/${id}/match-users`, { params });
  },
  adminBetLockGame(id: any, body: any) {
    return axiosClient.put(`/admin/matches/${id}/bet-status`, body);
  },
  adminDeleteGame(id: any, body: any) {
    return axiosClient.put(`/admin/matches/${id}/status`, body);
  },
  adminFinalizeGame(idGame: any, idWinner: any) {
    return axiosClient.put(
      `/admin/match-chicken/${idGame}/chickens/${idWinner}/choose-winner`,
    );
  },

  // user
  userJoinGame(id: any, body: any) {
    return axiosClient.post(`/admin/matches/${id}/match-users/join`, body);
  },
  userGetGames(params: any) {
    return axiosClient.get('/matches', { params });
  },
};
