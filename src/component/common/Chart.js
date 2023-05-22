import React from "react";
import { Pie, measureTextWidth } from '@ant-design/plots'

import '../../assets/css/common/chart.css';

const Chart = (props) => {

    const data = props.data;

    const renderStatistic = (containerWidth, text, style) => {
        const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
        const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

        let scale = 1;

        if (containerWidth < textWidth) {
            scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
        }

        const textStyleStr = `width:${containerWidth}px;`;
        return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
    }

    const config = {
        // appendPadding: 8,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        innerRadius: 0.7,
        meta: {
            value: {
                formatter: (v) => v,
            },
        },
        label: {
            type: 'inner',
            offset: '-50%',
            style: {
                textAlign: 'center',
            },
            autoRotate: false,
            content: '{value}',
        },
        statistic: {
            title: {
                offsetY: -4,
                customHtml: (container, view, datum) => {
                    const { width, height } = container.getBoundingClientRect();
                    const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
                    const text = datum ? datum.type : 'total';
                    return renderStatistic(d, text, {
                        fontSize: 20,
                    });
                },
            },
            content: {
                offsetY: 4,
                style: {
                    fontSize: '28px',
                },
                customHtml: (container, view, datum, data) => {
                    const { width } = container.getBoundingClientRect();
                    const text = datum ? datum.value : data.reduce((r, d) => r + d.value, 0);
                    return renderStatistic(width, text, {
                        fontSize: 28,
                    });
                },
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
            {
                type: 'pie-statistic-active',
            },
        ],
    };

    return (
        <React.Fragment>
            <Pie {...config} />
        </React.Fragment>
    );
};

export default Chart;
