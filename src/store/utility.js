export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const filterData = (data, filter) => {
  let filteredData = [];
  data.forEach((record) => {
    let valid = filter.type === "or" ? false : true;
    filter.filters.forEach((rule) => {
      let tempValid;
      if (rule.content.value === "") tempValid = true;
      else
        tempValid = rule.content.not
          ? record[rule.name].data.localeCompare(rule.content.value) !== 0
          : record[rule.name].data.localeCompare(rule.content.value) === 0;
      valid =
        filter.type === "or" ? valid || tempValid : valid && tempValid;
    });
    if (valid) filteredData.push(record);
  });
  return filteredData;
};
export const isRealValue = (obj) => {
  return obj && obj !== 'null' && obj !== 'undefined' && Object.keys(obj).length !== 0
}