import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export function ChartPie(props) {
    const [source, setSource] = useState()
    useEffect(() => {
        setSource(groupBy(props.data, "location"))
        splitLabel()
    },[props])
    const splitLabel = () =>{
        var dataSource = groupBy(props.data, "location")
        var label = []
        Object.entries(dataSource).map((e) => {
            label.push(e[0])
        })
        return label
    }
    const hitungJumlah = () => {
        var dataSource = groupBy(props.data, "location")
        var jumlah = []
        Object.entries(dataSource).map((e) => {
            jumlah.push(e[1].length)
        })
        return jumlah
    }
    const groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            return result;
        }, {});
    };

     const data = {
        labels: splitLabel(),
        datasets: [
            {
                label: '',
                data: hitungJumlah(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div style={{width:'100%'}}>
            <Pie  data={data} />;
        </div>

    )
}
