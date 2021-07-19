import React from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
//
import Card from "../../component/Card/Card";

const CardContainer = (props) => {
  return <Card item={props.item} />;
};

// CardContainer.propTypes = {
//   title: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   item: PropTypes.string.isRequired,
//   data: PropTypes.array.isRequired,
//   children: PropTypes.array,
// };

// const mapStateToProps = (state, { item }) => state.data[item];

// export default connect(mapStateToProps)(CardContainer);
export default CardContainer;
