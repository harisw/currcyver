// import React, {useEffect, useState} from "react";
// import {Text, View } from 'react-native';
// import axios from 'axios';
// import fx from "money";
// import moment from 'moment';
// import { Dimensions } from "react-native";
// import { LineChart } from "react-native-chart-kit";

// import Loading from "../components/Loading";
// import styled from "styled-components/native";

// const URL = "https://api.frankfurter.app/";
// const screenWidth = Dimensions.get("window").width;
// const CHART_CFG = {
// //   backgroundGradientFrom: "#1E2923",
// //   backgroundGradientFromOpacity: 0,
// //   backgroundGradientTo: "#08130D",
// //   backgroundGradientToOpacity: 0.5,
//   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//   strokeWidth: 2, // optional, default 3
//   barPercentage: 0.5,
//   useShadowColorFromDataset: false // optional
// };

// const CHART_SCALE = 6;
// const RateChart = props => {

//     const currentDay = moment().format('YYYY-MM-DD').toString();
//     const startDay = moment().subtract(12, 'day').format('YYYY-MM-DD').toString();
    
//     const [dateStart, setDateStart] = useState(currentDay);
//     const [dateEnd, setDateEnd] = useState(startDay);
//     const [data, setData] = useState();
//     const [error, setError] = useState();
//     const [chartStep, setStep] = useState();
//     const [chartData, setChartData] = useState([]);
//     const [chartLabel, setChartLabel] = useState([]);
//     const getData = () => {
//         axios.get(`${URL}${startDay}..${currentDay}?from=${props.from}&to=${props.to}`).then(res => {
//             setData(res.data.rates);
//         }).catch(err => {
//             setError(err.message);
//         });
//     };
//     useEffect(() => {
//         getData();
//     }, [dateStart, dateEnd]);


//     const shapeChartData = () => {
//         if(!data)   return;
//         setStep(Object.keys(data).length > 15 ? 5 : 3);
        
//         const mappedArr = Object.keys(data).map((key, index) => {
//             return {
//                 label: key.slice(-5),
//                 val : Object.values(data[key])[0]
//             };
//         });
//         //console.log(mappedArr);
//         const labelArr = mappedArr.map((e, index) => {
//             //if(index%chartStep==0 || index == mappedArr.length-1)
//                 return e.label;
//         });
//         //console.log(labelArr);
//         const dataArr = mappedArr.map((e, index) => {
//             //if(index%chartStep==0 || index == mappedArr.length-1)
//                 return e.val;
//         });
//         setChartData(dataArr);
//         setChartLabel(labelArr);
//         // for(let j=0; j<mappedArr.length-1; j += chartStep ){
//         //     setChartLabel(prevState => [
//         //         ...prevState,
//         //         mappedArr[j].label
//         //     ]);
//         //     setDataLabel()
//         //     labelArr.push(mappedArr[j].label);
//         //     dataArr.push(mappedArr[j].val);
//         //     console.log(j);
//         // }
//         // setChartData({
//         //     labels: labelArr,
//         //     datasets: [
//         //         {
//         //         data: dataArr,
//         //         color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
//         //         strokeWidth: 2 // optional
//         //         }
//         //     ],
//         //     legend: ["Rainy Days"] // optional
//         // });
//     }
//     useEffect(() => {
//         shapeChartData();
//     }, [data]);
//     if(error)   return <View><Text>Error ${error.message}</Text></View>;
//     if(!data || !chartData)   return <Loading />;
//     //console.log(chartData);
//     const chartArray = {
//             labels: chartLabel,
//             datasets: [
//                 {
//                 data: chartData,
//                 color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
//                 strokeWidth: 2 // optional
//                 }
//             ],
//             legend: ["Rainy Days"] // optional
//     };
//     console.log(chartLabel);
//     console.log(chartData);

//     return (
//         <View>
//             <LineChart
//                 data={chartArray}
//                 width={screenWidth}
//                 height={220}
//                 chartConfig={CHART_CFG}
//             />
//         </View>
//     );
// };

// export default RateChart;