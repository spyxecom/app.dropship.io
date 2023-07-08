import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions(
  {
    getCourseByIDRequest: ['payload'],
    getCourseByIDSuccess: ['payload'],
    getCourseByIDFailure: ['payload'],

    getCoursesRequest: null,
    getCoursesSuccess: ['payload'],
    getCoursesFailure: ['payload'],

    getChapterByIDRequest: ['payload'],
    getChapterByIDSuccess: ['payload'],
    getChapterByIDFailure: ['payload'],

    getAdditionalChaptersRequest: null,
    getAdditionalChaptersSuccess: ['payload'],
    getAdditionalChaptersFailure: ['payload'],

    saveVideoProgressRequest: ['payload'],
    saveVideoProgressSuccess: ['payload'],
    saveVideoProgressFailure: ['payload'],

    setSelectedChapter: ['payload'],
    setIsShort: ['payload'],
    resetErrors: null,
  }
);

export const UniversityPageTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  saveVideoLoading: false,
  isShortPath: false,
  errors: false,
  selectedCourse: {},
  courses: {},
  additionalChapters: {},
  selectedChapter: {}
});

/* ------------- Functions for reducer cases ------------- */

const getCourseByIDRequest = (state) =>
  state.merge({ loading: true });

const getCourseByIDSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, selectedCourse: data });

const getCourseByIDFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });

const getCoursesRequest = (state) =>
  state.merge({ loading: true });

const getCoursesSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, courses: data });

const getCoursesFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });

const getChapterByIDRequest = (state) =>
  state.merge({ loading: true });

const getChapterByIDSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, selectedChapter: data });

const getChapterByIDFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });

const getAdditionalChaptersRequest = (state) =>
  state.merge({ loading: true });

const getAdditionalChaptersSuccess = (state, { payload: data }) =>
  state.merge({ loading: false, additionalChapters: data });

const getAdditionalChaptersFailure = (state, { payload: { errors } }) =>
  state.merge({ loading: false, errors });

const saveVideoProgressRequest = (state) =>
  state.merge({ saveVideoLoading: true });

const saveVideoProgressSuccess = (state, { payload: data }) => {
  const newLessons = [...state.selectedChapter.lessons].map(el => {
    if (el?.id === data?.lesson?.id) return data?.lesson
    else return el
  });
  return state.merge({saveVideoLoading: false, selectedChapter: {...state.selectedChapter, lessons: newLessons}});
}

const saveVideoProgressFailure = (state, { payload: { errors } }) =>
  state.merge({ saveVideoLoading: false, errors });

const setSelectedChapter = (state, { payload: data }) =>
  state.merge({ selectedChapter: data });

const resetErrors = (state) =>
  state.merge({ errors: false  })

const setIsShort = (state, { payload: data }) =>
  state.merge({ isShortPath: data })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_COURSE_BY_ID_REQUEST]: getCourseByIDRequest,
  [Types.GET_COURSE_BY_ID_SUCCESS]: getCourseByIDSuccess,
  [Types.GET_COURSE_BY_ID_FAILURE]: getCourseByIDFailure,

  [Types.GET_COURSES_REQUEST]: getCoursesRequest,
  [Types.GET_COURSES_SUCCESS]: getCoursesSuccess,
  [Types.GET_COURSES_FAILURE]: getCoursesFailure,

  [Types.GET_CHAPTER_BY_ID_REQUEST]: getChapterByIDRequest,
  [Types.GET_CHAPTER_BY_ID_SUCCESS]: getChapterByIDSuccess,
  [Types.GET_CHAPTER_BY_ID_FAILURE]: getChapterByIDFailure,

  [Types.GET_ADDITIONAL_CHAPTERS_REQUEST]: getAdditionalChaptersRequest,
  [Types.GET_ADDITIONAL_CHAPTERS_SUCCESS]: getAdditionalChaptersSuccess,
  [Types.GET_ADDITIONAL_CHAPTERS_FAILURE]: getAdditionalChaptersFailure,

  [Types.SAVE_VIDEO_PROGRESS_REQUEST]: saveVideoProgressRequest,
  [Types.SAVE_VIDEO_PROGRESS_SUCCESS]: saveVideoProgressSuccess,
  [Types.SAVE_VIDEO_PROGRESS_FAILURE]: saveVideoProgressFailure,

  [Types.SET_SELECTED_CHAPTER]: setSelectedChapter,
  [Types.SET_IS_SHORT]: setIsShort,
  [Types.RESET_ERRORS]: resetErrors,
});
