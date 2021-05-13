const initialState = {
  basket: [],
  basketItem: 0,
  courseItem: 0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,

        basketItem: state.basketItem + 1,
      };

    case "REMOVE_FROM_BASKET":
      // const index = state.basket.findIndex(
      //   (course) => course.title === action.payload
      // );
      // let newBasket = [...state.basket];

      // if (index >= 0) {
      //   newBasket.splice(index, 1);
      // } else {
      //   console.warn(
      //     `can't remove product (id: ${action.payload}) as its not in basket!`
      //   );
      // }
      return {
        ...state,
        // basket: newBasket,
        basketItem: state.basketItem - 1,
      };

    case "ADD_ALL":
      return {
        ...state,
        basketItem: action.payload,
      };

    case "ADD_ALL_COURSES":
      return {
        ...state,
        courseItem: action.payload,
      };

    default:
      return state;
  }
}
