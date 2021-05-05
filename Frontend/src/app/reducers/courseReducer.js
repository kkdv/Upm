const initialState = {
  courses: [],
  error: [],
};

export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_COURSES_REQUEST":
      return {
        loading: true,
        courses: [],
      };
    case "ADD_COURSES_SUCCESS":
      return {
        loading: false,
        courses: action.payload.courses,
      };

    case "ADD_COURSES_FAIL":
      return {
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
