import {call, put, takeLatest} from "redux-saga/effects";
import { push } from 'connected-react-router';
import Creators, {UniversityPageTypes as constants} from "./reducer";
import * as services from './services';

const actions = {
  getCourseByIDActions: {
    request: Creators.getCourseByIDRequest,
    success: Creators.getCourseByIDSuccess,
    errors: Creators.getCourseByIDFailure,
  },
  getCoursesActions: {
    request: Creators.getCoursesRequest,
    success: Creators.getCoursesSuccess,
    errors: Creators.getCoursesFailure,
  },
  getChapterByIDActions: {
    request: Creators.getChapterByIDRequest,
    success: Creators.getChapterByIDSuccess,
    errors: Creators.getChapterByIDFailure,
  },
  getAdditionalChaptersActions: {
    request: Creators.getAdditionalChaptersRequest,
    success: Creators.getAdditionalChaptersSuccess,
    errors: Creators.getAdditionalChaptersFailure,
  },
  saveVideoProgressActions: {
    request: Creators.saveVideoProgressRequest,
    success: Creators.saveVideoProgressSuccess,
    errors: Creators.saveVideoProgressFailure,
  },
};

const eventsOptions = {
  [constants.GET_COURSE_BY_ID_REQUEST]: {
    api: services.getCourseByID,
    actions: actions.getCourseByIDActions
  },
  [constants.GET_COURSES_REQUEST]: {
    api: services.getCourses,
    actions: actions.getCoursesActions
  },
  [constants.GET_CHAPTER_BY_ID_REQUEST]: {
    api: services.getChapterByID,
    actions: actions.getChapterByIDActions
  },
  [constants.GET_ADDITIONAL_CHAPTERS_REQUEST]: {
    api: services.getAdditionalChapters,
    actions: actions.getAdditionalChaptersActions
  },
  [constants.SAVE_VIDEO_PROGRESS_REQUEST]: {
    api: services.saveVideoProgress,
    actions: actions.saveVideoProgressActions
  },
};

function* apiGenerator(action) {
  const provider = eventsOptions[action.type];

  try {
    const params = action.payload;
    const response = yield call(provider.api, params);

    if ((response?.data || response.status === 204) && response.ok) {
      yield put(provider.actions.success(response.data));
    } else {
      if (response?.status === 404) {
        yield put(push('/dropship-university'));
      } else {
        const error = Object.values(response.data).length
          ? Object.values(response.data)[0].detail
          : null;
        yield put(provider.actions.errors({ errors: error }));
      }
    }
  } catch (errors) {
    yield put(provider.actions.errors({ errors }));
  }
}

export default function* apiSaga() {
  yield takeLatest(constants.GET_COURSE_BY_ID_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_COURSES_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_ADDITIONAL_CHAPTERS_REQUEST, apiGenerator);
  yield takeLatest(constants.GET_CHAPTER_BY_ID_REQUEST, apiGenerator);
  yield takeLatest(constants.SAVE_VIDEO_PROGRESS_REQUEST, apiGenerator);
}
