import Chart, { plugins } from 'chart.js/auto'

// (async function () {
//     const data = [
//         { year: 2010, count: 10 },
//         { year: 2011, count: 20 },
//         { year: 2012, count: 15 },
//         { year: 2013, count: 25 },
//         { year: 2014, count: 22 },
//         { year: 2015, count: 30 },
//         { year: 2016, count: 28 },
//     ];

//     new Chart(
//         document.getElementById('acquisitions'),
//         {
//             type: 'bar',
//             options: {
//                 animation: false,
//                 plugins: {
//                     legend: {
//                         display: false
//                     },
//                     tooltip: {
//                         enable: false
//                     }
//                 }
//             },
//             data: {
//                 labels: data.map(row => row.year),
//                 datasets: [
//                     {
//                         label: 'Acquisitions by year',
//                         data: data.map(row => row.count)
//                     }
//                 ]
//             }
//         }
//     );
// })();

const length = 20;
const range = 51;

let data = [];
let time = 0;
for (let i = 0; i !== length; ++i) {
    data[i] = randomData();
}

function randomData() {
    time += 1;
    return ({ time: time - 1, temparature: Math.floor(Math.random() * range) - 5 });
}

const DATA_COUNT = 20;
const NUMBER_CFG = { count: DATA_COUNT, min: -5, max: 45 };
let label_time = 0;

function onRefresh(chart) {
    const data = randomData();
    chart.config.data.datasets.forEach(function (dataset) {
        dataset.data.push({
            x: data.time,
            y: data.temparature
        });
        dataset.data.shift(1);
    });
}

let tempChart = new Chart(
    document.getElementById("temperature"),
    {
        type: 'line',
        data: {
            labels: data.map(row => row.time),
            datasets: [
                {
                    label: "Temperature in",
                    data: data.map(row => row.temparature)
                }
            ]
        },
        options: {
            // responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            title: {
                display: true,
                text: 'Temperature'
            }
        }
    }
)

function updateData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.data.labels.shift(1);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift(1);
    });
    chart.update();
}

setInterval(() => {
    const res = randomData();
    updateData(tempChart, res.time, res.temparature);
}, 2000);