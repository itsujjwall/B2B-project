export const constructData = (group) => {
    var categories = [];
    var seriesData = [];
  
    group.forEach((d) => {
      categories.push(d.key);
      seriesData.push(d.value);
    });
  
    return {
      categories,
      seriesData,
    };
  };
  