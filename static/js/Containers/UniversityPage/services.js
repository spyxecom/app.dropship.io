import { API } from '../../Services/Api';
const request = new API();

export const getCourses = () => request.api.get(`/university/courses/`, null);
export const getCourseByID = (id) => request.api.get(`/university/courses/${id}/`, null);
export const getAdditionalChapters = () => request.api.get(`/university/course-chapters/`, null);
export const getChapterByID = (id) => request.api.get(`/university/course-chapters/${id}/`, null);
export const saveVideoProgress = (data) => request.api.post(`/university/lessons/${data?.id}/save_user_progress/`, {progress: +data?.progress});
