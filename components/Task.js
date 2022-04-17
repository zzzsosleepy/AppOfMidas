import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Tooltip from 'rn-tooltip';
import OptionButton from './OptionButton';



const Task = (props) => {

    const [showTooltip, setShowTooltip] = useState(true);

    var catColor = props.color;
    switch (catColor) {
        case 0:
            break;
        case 1:
            catColor = styles.redBG;
            break;
        case 2:
            catColor = styles.blueBG;
            break;
        case 3:
            catColor = styles.greenBG;
            break;
        case 4:
            catColor = styles.yellowBG;
            break;
        case 5:
            catColor = styles.purpleBG;
            break;
    }

    const deleteItem = (deleteTransaction) => {
        setShowTooltip(false);
        setTimeout(() => {
            setShowTooltip(true);
            deleteTransaction();
        }, 0.5);
    }

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <View style={[styles.square, catColor]}></View>
                    <Text style={styles.timeText}>{props.time}</Text>
                    {props.type === 'purchase' ?
                        <Text style={styles.itemText}>{props.text} <Text style={styles.bold}>-${props.cost}</Text></Text>
                        :
                        <Text style={styles.itemText}>{props.text} <Text style={styles.bold}>+${props.cost}</Text></Text>
                    }{showTooltip ?
                        <Tooltip popover={<TouchableOpacity onPress={() => deleteItem(props.deleteTransaction)}><Text style={{ color: '#ddd', fontSize: 18, }}>Delete</Text></TouchableOpacity>} withOverlay={false} backgroundColor={'#171717'} containerStyle={{ height: 50, width: 150, }}>
                            <OptionButton />
                        </Tooltip> : <OptionButton />
                    }
                </View>
            </View >
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        width: '90%',
        borderColor: 'rgba(0,0,0,1)',
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderTopWidth: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    bold: {
        fontWeight: 'bold',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 48,
        height: 24,
        opacity: 1,
        borderRadius: 10,
        marginRight: 15,
        borderColor: '#171717',
        borderWidth: 2,
    },
    itemText: {
        fontSize: 15,
        maxWidth: '90%',
        textAlign: 'right',
        flex: 1,
        marginRight: 20,
        color: '#171717',
    },
    timeText: {
        fontSize: 14,
        color: 'rgba(0,0,0,0.5)',
    },
    showTooltip: {
        display: 'flex',
    },
    hideTooltip: {
        display: 'none',
    },
    circular: {
        width: 18,
        height: 18,
        borderColor: '#171717',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 30,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
    },
    redBG: {
        backgroundColor: '#FF5A5F',
    },
    blueBG: {
        backgroundColor: '#55BCF6',
    },
    greenBG: {
        backgroundColor: '#32a852',
    },
    yellowBG: {
        backgroundColor: '#fcba03',
    },
    purpleBG: {
        backgroundColor: '#9c27b0',
    }
});

export default Task;