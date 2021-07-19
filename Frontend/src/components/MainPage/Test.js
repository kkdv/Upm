import React, {
    useEffect,
    useState
} from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    getCourses
} from "../app/actions/courseAction";
import ItemsCarousel from "react-items-carousel";
import Card from "./MainPage/Card";
import "./Test.css";

function Test() {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.courses.courses);

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;

    useEffect(() => {
        dispatch(getCourses());
    }, [dispatch]);

    const cardsJsx = courses.map((course) => ( <
        Card key = {
            course._id
        }
        data = {
            course
        }
        />
    ));
    return ( <
        div >
        <
        div style = {
            {
                padding: `0 ${chevronWidth}px`
            }
        } >
        <
        ItemsCarousel requestToChangeActive = {
            setActiveItemIndex
        }
        activeItemIndex = {
            activeItemIndex
        }
        numberOfCards = {
            5
        }
        gutter = {
            20
        }
        slidesToScroll = {
            4
        }
        leftChevron = {
            < button className = "carousel__button_left" > {
                "<"
            } < /button>}
            rightChevron = {
                <
                button className = "carousel__button_right" > {
                    ">"
                } < /button>
            }
            outsideChevron
            chevronWidth = {
                chevronWidth
            } >
            {
                cardsJsx
            } <
            /ItemsCarousel> <
            /div> <
            /div>
        );
    }

    export default Test;
