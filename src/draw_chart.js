import Chart from 'chart.js/auto';
var mysql = require('mysql');

// let time = 0;
// const range = 51;
// const x_length = 3;
// function randomData() {
//     time += 1;
//     return ({ x: time - 1, y: Math.floor(Math.random() * range) - 5 });
// }

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "xmpp_demo"
});


let last_update = 0;

let tempChart = new Chart(
    document.getElementById("temperature"),
    {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: "Temperature in",
                    data: []
                }
            ]
        },
        options: {
            // animation: {
            //     delay: 1000,
            // },
            parsing: false,
            scales: {
                y: {
                    type: 'linear',
                    min: -5,
                    max: 45,
                }
            },
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
    // chart.data.labels.push(label);
    chart.data.datasets[0].data.push(data);
    if (chart.data.labels.length == x_length) {
        // chart.data.labels.shift(1);
        chart.data.datasets[0].data.shift(1);
    }
    chart.update();
}

setInterval(() => {
    // const res = randomData();
    con.connect();

    con.query('select * from clients', (err, res, fields) => {
        if (err) throw err;
        let row = res[0];
        if (row.last_update !== last_update) {
            updateData(tempChart, row.time, row.temperature);
        }
    })

    con.end();
}, 2000);