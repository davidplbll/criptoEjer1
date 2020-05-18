import * as echarts from "echarts";

// include bar chart

export const frecuencyLetterEN = {
  e: 11.162,//8
  t: 9.356,//;
  a: 8.497,//
  r: 7.587,//)
  i: 7.546,
  o: 7.507,
  n: 6.749,
  s: 6.327,
  h: 6.094,//4
  d: 4.253,
  l: 4.025,
  u: 2.758,
  w: 2.56,
  m: 2.406,
  f: 2.228,
  c: 2.202,
  g: 2.015,
  y: 1.99,
  b: 1.492,
  p: 1.929,
  k: 1.292,
  v: 0.978,
  j: 0.153,
  x: 0.15,
  q: 0.095,
};


/*
*/
// 8: 16.256157635467982
// ;: 12.31527093596059
// 4: 9.35960591133005
// ): 7.8817733990147785
// <: 7.8817733990147785
// *: 6.403940886699507
// 5: 5.911330049261084
// 6: 5.41871921182266
// (: 4.926108374384237
// 1: 3.9408866995073892
// >: 3.9408866995073892
// 0: 2.955665024630542
// 2: 2.4630541871921183
// 9: 2.4630541871921183
// 3: 1.9704433497536946
// ?: 1.477832512315271
// :: 1.9704433497536946
// -: 0.49261083743842365
// &: 0.9852216748768473
// .: 0.9852216748768473

export const getFrecuencyOfText = (text) => {
  if (text) {
    const { length } = String(text);
    const letters = text.split("").reduce((object, letter) => {
      object[letter] =
        object[letter] == undefined ? 1 : Number(object[letter]) + 1;
      return object;
    }, {});
    generateGrapghicCount(letters);
 console.log("letters ", letters);
    return Object.keys(letters).reduce((object, key) => {
      object[key] = Number((100 / length) * letters[key]);
      return object;
    }, {});
  } else {
    return null;
  }
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

  var dataShadow = Array.from(Object.keys(lettersCount), () =>
    Math.max.apply(
      null,
      data.map((element) => element.value)
    )
  );

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
    myChart.dispatchAction({
      type: "dataZoom",
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
        dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)],
    });
  });
}
