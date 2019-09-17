import React, { StatelessComponent } from "react";
import { Button } from "antd";

type data = {
  _id?: string;
  value?: string;
  minPrice?: number;
  detail?: string;
  mainCategory?: string;
  isActive?: Boolean;
  name_TR?: string;
  name_EN?: string;
};

interface IProps {
  onBoxClick({  }: any): any;
  category: data;
  isTherapyPage?: boolean;
  isClicked: boolean;
  effectivePrice?: number;
  language: string;
}

const SubCategoryBox: StatelessComponent<IProps> = props => {
  const { category, isClicked, effectivePrice, language } = props;
  return (
    <Button
      style={{
        textAlign: "center",
        marginBottom: "20px",
        width: "100%",
        color: "white",
        backgroundColor: isClicked ? "#9ED5AC" : "rgb(0, 155, 223)",
        borderColor: isClicked ? "#9ED5AC" : "rgb(0, 155, 223)"
      }}
      onClick={() => props.onBoxClick({ category, effectivePrice })}
    >
      {language === "tr" ? category.name_TR : category.name_EN}
      {effectivePrice && "( " + effectivePrice + " TL)"}
    </Button>
  );
};

export default SubCategoryBox;
