export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const filterData = (data, filterRules) => {
  let filteredData = []
  data.forEach(record => {
    let valid = filterRules.operator === 'یا' ? false : true;
    filterRules.fields.forEach(rule => {
      let tempValid = rule.content.not ? record[rule.name].data !== rule.content.value : record[rule.name].data.localeCompare(rule.content.value) === 0
      valid = filterRules.operator === 'یا' ? (valid || tempValid) : (valid && tempValid);
    });
    if (valid) filteredData.push(record)
  })
  return filteredData
}