const initialState = {
  courses: null,
};

export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_COURSES":
      return {
        ...state,
        courses: action.payload,
      };

    default:
      return state;
  }
}
