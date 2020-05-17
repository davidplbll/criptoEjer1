import * as echarts from "echarts";

// include bar chart

const frecuencyLetterEN = {
  a: 8.497,
  b: 1.492,
  c: 2.202,
  d: 4.253,
  e: 11.162,
  f: 2.228,
  g: 2.015,
  h: 6.094,
  i: 7.546,
  j: 0.153,
  k: 1.292,
  l: 4.025,
  m: 2.406,
  n: 6.749,
  o: 7.507,
  p: 1.929,
  q: 0.095,
  r: 7.587,
  s: 6.327,
  t: 9.356,
  u: 2.758,
  v: 0.978,
  w: 2.56,
  x: 0.15,
  y: 1.99,
  z: 0.077,
};

export const getFrecuencyOfText = (text) => {
  if (text) {
    const { length } = String(text);
    const letters = text.split("").reduce((object, letter) => {
      object[letter] =
        object[letter] == undefined ? 1 : Number(object[letter]) + 1;
      return object;
    }, {});
    generateGrapghicCount(letters);
    return Object.keys(letters).reduce((object, key) => {
      object[key] = Number((100 / length) * letters[key]);
      return object;
    }, {});
  } else {
    return null;
  }
};

export const firsConvertion = (letters) => {
  let counter = 0;
};

function generateGrapghicCount(lettersCount) {
  const { clientWidth } = document.getElementById("lettersCount");
  document.getElementById("lettersCount").style.display = "block";
  const chartContainer = document.getElementById("chartSimbolosBarras");
  chartContainer.style.widows = `${clientWidth - 10}px`;
  var myChart = echarts.init(chartContainer);
  var dataAxis = Object.keys(lettersCount);
  var data = Object.keys(lettersCount).map((key) => ({
    value: lettersCount[key],
    name: key,
  }));
  var dataShadow = Array.from(Object.keys(lettersCount), () => Math.max(data));

  let option = {
    title: {
      text: "Conteo de los caracteres",
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        textStyle: {
          color: "#fff",
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: "#999",
        },
      },
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        // For shadow
        type: "bar",
        itemStyle: {
          color: "rgba(0,0,0,0.05)",
        },
        barGap: "-100%",
        barCategoryGap: "40%",
        data: dataShadow,
        animation: false,
      },
      {
        type: "bar",
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: data,
      },
    ],
    tooltip: {
      trigger: "item",
      formatter: "Simbolo: {b} <br/> conteo:{c}",
    },
  };

  // Enable data zoom when user click bar.
  myChart.setOption(option);
  var zoomSize = 6;
  myChart.on("click", function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart.dispatchAction({
      type: "dataZoom",
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
        dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)],
    });
  });
}
