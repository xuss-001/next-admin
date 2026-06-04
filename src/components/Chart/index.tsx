import { useEffect, useRef } from 'react';
import createChart from './tool';
import { isDev } from '@/utils';

interface IChart {
    type: string,
    id: string,
    data: any
}

const MyChart = (props: IChart) => {
    const chartRef = useRef<HTMLElement | null>(null);
    const renderedRef = useRef(false);
    const { type, data, id } = props;

    useEffect(() => {
        if (data === null || data === undefined) {
            return;
        }

        let chart: any;
        if (isDev) {
            if (!renderedRef.current) {
                renderedRef.current = true;
                chart = createChart(chartRef.current!, type, data);
            }
        } else {
            chart = createChart(chartRef.current!, type, data);
        }

        return () => {
            chart && chart.destroy();
        }
    }, [type, data, id]);

    if (data === null || data === undefined) {
        return <div ref={chartRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>数据加载失败</div>;
    }

    return <div ref={chartRef}></div>
}

export default MyChart