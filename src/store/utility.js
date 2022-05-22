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
      if (rule.content.isPeriod) {
        if (rule.type === "عدد") {
          let startValid = filter.type === "or" ? false : true;
          let endValid = filter.type === "or" ? false : true;
          if (rule.content.value.start)
            startValid =
              parseInt(record[rule.name].data) >=
              parseInt(rule.content.value.start);
          else startValid = true;
          if (rule.content.value.end)
            endValid =
              parseInt(record[rule.name].data) <=
              parseInt(rule.content.value.end);
          else endValid = true;

          valid =
            filter.type === "or"
              ? valid || (startValid && endValid)
              : valid && startValid && endValid;

          if (rule.content.not) valid = !valid;
        } else if (rule.type === "تاریخ‌") {
          let startValid = filter.type === "or" ? false : true;
          let endValid = filter.type === "or" ? false : true;
          if (rule.content.value.start)
            startValid =
              record[rule.name].data?.localeCompare(rule.content.value.start) >=
              0;
          else startValid = true;
          if (rule.content.value.end)
            endValid =
              record[rule.name].data?.localeCompare(rule.content.value.end) <=
              0;
          else endValid = true;

          valid =
            filter.type === "or"
              ? valid || (startValid && endValid)
              : valid && startValid && endValid;

          if (rule.content.not) valid = !valid;
        }
      } else {
        let tempValid;
        if (rule.content.value === "") {
          // tempValid = true;
          if (record[rule.name].data)
            tempValid = rule.content.not ? true : false;
          else tempValid = rule.content.not ? false : true;
        } else {
          tempValid = rule.content.not
            ? record[rule.name].data?.localeCompare(rule.content.value) !== 0
            : record[rule.name].data?.localeCompare(rule.content.value) === 0;
        }
        valid = filter.type === "or" ? valid || tempValid : valid && tempValid;
      }
    });
    if (valid) filteredData.push(record);
  });
  return filteredData;
};
export const isRealValue = (obj) => {
  return (
    obj &&
    obj !== "null" &&
    obj !== "undefined" &&
    Object.keys(obj).length !== 0
  );
};
