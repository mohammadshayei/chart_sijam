import React from "react";
import { connect } from "react-redux";
//
import Card from "../../component/Card/Card";

const CardContainer = (props) => {
  return <Card  key={props.item.id} item={props.item} />;
};

// const mapStateToProps = (state, { item }) => state.data[item];

// export default connect(mapStateToProps)(CardContainer);
export default CardContainer;
