const initialState = {
  courses: [],
  filteredCourse: [],
  activeCourse: [],
  error: [],
};

export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_COURSES_REQUEST":
      return {
        ...state,
        loading: true,
        activeCourse: [],
      };
    case "ADD_COURSES_SUCCESS":
      return {
        ...state,
        loading: false,
        courses: action.payload.courses,
      };
    case "ADD_FILTERD_COURSES_SUCCESS":
      return {
        ...state,
        loading: false,
        filteredCourse: action.payload,
      };

    case "ADD_SINGAL_COURSES_SUCCESS":
      return {
        ...state,
        loading: false,
        activeCourse: action.payload.courses,
      };

    case "ADD_COURSES_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
