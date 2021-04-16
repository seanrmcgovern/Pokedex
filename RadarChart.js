import React, { useMemo } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Polygon, Text } from "react-native-svg";
import { times } from "lodash";

const svgY = (degrees) => degrees + 180;

const degreesToRadians = (degree) => degree * Math.PI / 180;

const calculateEdgePointFor = (center, radius, degree, scale = 1) => {
    const degreeInRadiansX = degreesToRadians(degree);
    const degreeInRadiansY = degreesToRadians(svgY(degree));
    return [
        center + Math.cos(degreeInRadiansX) * radius * scale, 
        center + Math.sin(degreeInRadiansY) * radius * scale
    ];
};

const RadarChart = (props) => {
    const viewBoxSize = props.size;
    const viewBoxCenter = viewBoxSize * 0.5;
    const radius = viewBoxSize * 0.4;

    const labels = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"]
    
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Svg height="100%" width="100%" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
                <Circle
                    cx={viewBoxCenter}
                    cy={viewBoxCenter}
                    r={radius}
                    stroke="black"
                    strokeOpacity="0.2"
                    strokeWidth="0.5"
                    fill="#F0F0F0"
                />
                {times(3).map(i => (
                    <Circle 
                        key={`inner_circle${i}`}
                        cx={viewBoxCenter}
                        cy={viewBoxCenter}
                        r={(i+1) * radius * 0.25}
                        stroke="black"
                        strokeOpacity="0.2"
                        strokeWidth="0.5"
                        fill="transparent"
                    />
                ))}
                {times(3).map(i => (
                    <Line
                        key={`crosshair_${i}`}
                        x1={calculateEdgePointFor(viewBoxCenter, radius, i * 60)[0]}
                        y1={calculateEdgePointFor(viewBoxCenter, radius, i * 60)[1]}
                        x2={calculateEdgePointFor(viewBoxCenter, radius, i * 60 + 180)[0]}
                        y2={calculateEdgePointFor(viewBoxCenter, radius, i * 60 + 180)[1]}
                        stroke="black"
                        strokeOpacity="0.2"
                        strokeWidth="0.5"
                        fill="transparent"
                    />
                ))}
                {times(6).map(i => (
                    <Text
                        fill="white"
                        fontSize="8"
                        fontWeight="bold"
                        x={calculateEdgePointFor(viewBoxCenter, radius, i*60, 1.2)[0]}
                        y={calculateEdgePointFor(viewBoxCenter, radius, i*60, 1.2)[1] + 5}
                        textAnchor="middle"
                    >
                        {labels[i]}
                    </Text>
                ))}
                <Polygon 
                    points={`${props.data.map((stat, i) => {
                        const edgePoint = calculateEdgePointFor(viewBoxCenter, radius, i*60, stat/175);
                        return `${edgePoint[0]}, ${edgePoint[1]}`;
                    })}`}
                    stroke="#50E2C2"
                    strokeWidth={1.2}
                    fill="#50E2C2"
                    fillOpacity={0.6}
                />
            </Svg>
        </View>
    );
       
};

export default RadarChart;