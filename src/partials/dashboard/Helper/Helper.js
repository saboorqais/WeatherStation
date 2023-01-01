function getTemperature(data) {
  const arrays = [];
  const values = data?.map((value) => {
    arrays.push(parseFloat(value.field1));
  });

  return arrays;
}
export function getHumidity(data) {
  const arrays = [];
  const values = data?.map((value) => {
    if (value.field2.split("/")) {
      arrays.push(parseFloat(value.field2.split("/")[0]));
    } else {
      arrays.push(parseFloat(value.field2));
    }
  });

  return arrays;
}

export function getMoisture(data) {
    const arrays = [];
    const values = data?.map((value) => {
      if (value.field3?.split("/")) {
        arrays.push(parseFloat(value.field3.split("/")[0]));
      } else {
        arrays.push(parseFloat(value.field3));
      }
    });
  console.log(arrays)
    return arrays;
  }

export function getDates(data) {
  const array = [];
  const values = data?.map((value) => {
    array.push(value.created_at.split("T")[0]);
  });

  return array;
}

export default getTemperature;
