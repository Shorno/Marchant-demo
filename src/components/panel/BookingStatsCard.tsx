import {Card, Col, Statistic} from 'antd';
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';
import {Tiny} from '@ant-design/charts';

interface ChartDataPoint {
    value: number;
    index: number;
}

export type BookingStatTrend = 'up' | 'down';

interface BookingStatsCardProps {
    title: string;
    value: number;
    color: string;
    trend: BookingStatTrend;
    chartData?: number[];
}



const getTrendIcon = (trend: 'up' | 'down', color: string) => {
    const iconProps = {style: {color, fontSize: "1.4rem"}};
    return trend === 'up' ? <ArrowUpOutlined {...iconProps} /> : <ArrowDownOutlined {...iconProps} />;
};

export default function BookingStatsCard({
                                             title,
                                             value,
                                             color,
                                             trend = "up",
                                             chartData,
                                         }: BookingStatsCardProps) {
    const DEFAULT_CHART_CONFIG = {
        height: 70,
        padding: 0,
        shapeField: 'smooth',
        xField: 'index',
        yField: 'value',
        style: {
            fill: `linear-gradient(-90deg, white 0%, ${color} 100%)`,
            fillOpacity: 0.6,
        },
    };
    const processedChartData: ChartDataPoint[] = chartData
        ? chartData.map((value, index) => ({value, index}))
        : [];

    const finalChartConfig = {
        ...DEFAULT_CHART_CONFIG,
        data: processedChartData,
    };

    return (
        <Col xs={24} sm={12} lg={6}>
            <Card
                size="small"
                style={{
                    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
                }}
            >
                <Statistic
                    className="ubaky-stats"
                    title={title}
                    value={value}
                    valueStyle={{color}}
                    prefix={getTrendIcon(trend, color)}
                />
                {processedChartData.length > 0 && <Tiny.Area {...finalChartConfig} />}
            </Card>
        </Col>
    );
}