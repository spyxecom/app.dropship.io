// /*  Drop Times services */

import { API } from '../../Services/Api';

const request = new API();

export const getTimerList = () => request.api.get(`/admin-panel/timer/`, null);

export const timerUpdate = ({ id, end }) =>
  request.api.put(`/admin-panel/timer/${id}/`, { ...(end && { end }) });

export const timerUpdatePartial = ({ id, end }) =>
  request.api.patch(`/admin-panel/timer/${id}/`, { ...(end && { end }) });
