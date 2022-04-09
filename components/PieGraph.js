import React from 'react'
import { PieChart } from 'react-native-chart-kit';
import { View, StyleSheet, Text } from 'react-native'
import { Dimensions } from 'react-native-web';

const data = [
    {
        name: "Seoul",
        total: 21500000,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Toronto",
        total: 2800000,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Beijing",
        total: 527612,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "New York",
        total: 8538000,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Moscow",
        total: 11920000,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
];

const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
};

const screenWidth = Dimensions.get('window').width;

function PieGraph() {
    return (
        <View style={styles.container}>
            <View style={styles.bodyContainer}>
                <View style={styles.chartContainer}>
                    <PieChart
                        data={data}
                        width={screenWidth}
                        height={200}
                        chartConfig={chartConfig}
                        accessor={'total'}
                        backgroundColor={'transparent'}
                        center={[0, 0]}
                        hasLegend={false}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    bodyContainer: {
        flexDirection: 'row',
    },
    chartContainer: {
        flex: 1,
    },
    legendContainer: {
        flex: 1,
        marginTop: 20,
    },
});

export default PieGraph;