import {Card, Col, Row, Statistic, Tabs, TabsProps} from "antd";
import {
    CreditCardOutlined,
    IdcardOutlined,
    LoginOutlined,
    MedicineBoxOutlined,
    TeamOutlined,
    UserAddOutlined
} from "@ant-design/icons";
import {Typography} from "antd";
import "./Dashboard.css";

const {Title} = Typography;

const statisticValueStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse'
} as const;

const statisticsData = [
    {
        title: "Login Today",
        icon: <LoginOutlined/>,
        bordered: false
    },
    {
        title: "Registration Today",
        icon: <UserAddOutlined/>,
        bordered: true
    },
    {
        title: "Total Registration",
        icon: <TeamOutlined/>,
        bordered: false
    },
    {
        title: "Doctor Consultation",
        icon: <MedicineBoxOutlined/>,
        bordered: false
    },
    {
        title: "Policy Owner Served",
        icon: <IdcardOutlined/>,
        bordered: false
    },
    {
        title: "Life Card Accessed",
        icon: <CreditCardOutlined/>,
        bordered: false
    }
];

export default function Dashboard() {

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Monthly',
        },
        {
            key: '2',
            label: 'Weekly',
        },
        {
            key: '3',
            label: 'Daily',
        },
    ];
    return (
        <>
            <Card title="Dashboard"/>

            <Row gutter={[16, 16]} style={{marginTop: "1rem"}}>
                {statisticsData.map((stat, index) => (
                    <Col xs={24} sm={12} md={8} lg={4} key={index}>
                        <Card
                            title={stat.title}
                            bordered={stat.bordered}
                        >
                            <Statistic
                                value={0}
                                prefix={stat.icon}
                                valueStyle={statisticValueStyle}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
            <Card className={"customerLog"}>
                <div className={"cardHeader"}>
                    <Title level={5}>Customer Log</Title>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
                </div>
                <div className={"noData"}>No data available</div>
            </Card>
            <Row gutter={[20,20]} style={{marginTop : "2rem"}} >
                <Col span={12}>
                    <Card bordered title="User Registration Monthly Activity Summery" style={{height : "25rem"}}>
                        <div className={"noData"}>No data available</div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered title="Membership Type" style={{height : "25rem"}}>
                        <div className={"noData"}>No data available</div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered title="User based on Policy Type" style={{height : "25rem"}}>
                        <div className={"noData"}>No data available</div>
                    </Card>
                </Col>
            </Row>
            <Row gutter={[20,40]} style={{marginTop : "2rem"}} >
                <Col span={24}>
                    <Card bordered title="User Hourly Average Count" style={{height : "25rem"}}>
                        <div className={"noData"}>No data available</div>
                    </Card>
                </Col>
            </Row>
        </>
    )
}