import React from "react";
import CategoryCard from "./CategoryCard";
import "./TopCategories.css";
import kidney_img from "../../images/logo/upmc/kidney.jpeg";
import surgery_img from "../../images/logo/upmc/surgery.jpeg";
import general_med_img from "../../images/logo/upmc/general_med.jpeg";
import urology_img from "../../images/logo/upmc/urology.jpeg";
import ent_img from "../../images/logo/upmc/ent.jpeg";
import womens_img from "../../images/logo/upmc/womens.jpeg";
import mental_img from "../../images/logo/upmc/mental.jpeg";
import endocrine_img from "../../images/logo/upmc/endocrine.jpeg";

function TopCategories() {
  return (
    <div id="categories" className="topCategories">
      <h2 className="categoryHeading"> Course Listing for </h2>{" "}
      <div className="categories">
        <CategoryCard imgSrc={surgery_img} title={"Surgery"} />{" "}
        <CategoryCard imgSrc={general_med_img} title={"General Medicine"} />{" "}
        <CategoryCard imgSrc={kidney_img} title={"Kidney"} />{" "}
        <CategoryCard imgSrc={ent_img} title={"Ear, Nose, Throat"} />{" "}
        <CategoryCard imgSrc={endocrine_img} title={"Endocrinology"} />{" "}
        <CategoryCard imgSrc={urology_img} title={"Urology"} />{" "}
        <CategoryCard imgSrc={mental_img} title={"Mental Health"} />{" "}
        <CategoryCard imgSrc={womens_img} title={"Women's health"} />{" "}
      </div>{" "}
    </div>
  );
}

export default TopCategories;
