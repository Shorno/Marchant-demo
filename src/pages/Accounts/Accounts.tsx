import "./account.css";
import {
    Button,
    Menu,
    Dropdown,
    Space,
    Typography,
    Progress,
    Card,
    Badge,
    Table,
} from "antd";
import {
    CloudDownloadOutlined,
    EllipsisOutlined,
    FilePdfOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

export default function Accounts() {
    const menu = (
        <Menu>
            <Menu.Item key="1">bill</Menu.Item>
            <Menu.Item key="2">payment</Menu.Item>
            <Menu.Item key="3">Settings</Menu.Item>
        </Menu>
    );

    // Table Data
    const dataSource = [
        {
            key: "1",
            id: "0012",
            date: "12 Apr 2025",
            plan: "Basic plan",
            amount: "USD $10.00",
        },
        {
            key: "2",
            id: "0012",
            date: "12 Apr 2025",
            plan: "Basic plan",
            amount: "USD $10.00",
        },
        {
            key: "3",
            id: "0012",
            date: "14 Apr 2025",
            plan: "Basic plan",
            amount: "USD $10.00",
        },
        {
            key: "4",
            id: "0012",
            date: "12 May 2025",
            plan: "Basic plan",
            amount: "USD $10.00",
        },
        {
            key: "5",
            id: "0012",
            date: "12 Apr 2025",
            plan: "Basic plan",
            amount: "USD $10.00",
        },
    ];

    // Table Columns
    const columns = [
        {
          dataIndex: "icon",
          key: "icon",
          render: () => <FilePdfOutlined style={{ fontSize: 24 }} />,
          width: 50,
        },
        {
          dataIndex: "id",
          key: "id",
          render: (id) => <Text>Invoice {id}</Text>,
          className: "ant-table-cell-invoice", // Add specific class for styling
        },
        {
          dataIndex: "date",
          key: "date",
        },
        {
          dataIndex: "plan",
          key: "plan",
        },
        {
          dataIndex: "amount",
          key: "amount",
        },
        {
          dataIndex: "action",
          key: "action",
          render: () => (
            <Space>
              <CloudDownloadOutlined style={{ fontSize: 18, cursor: "pointer" }} />
            </Space>
          ),
          width: 50,
        },
      ];
      

    return (
        <div style={{ padding: "0px" }}>
            <div className="billing-container">
                {/* Top Section: Seats Usage */}
                <div className="notification-banner">
                    <div className="progress-content">
                        <div className="progress-circle">
                            <Progress
                                type="circle"
                                percent={(14 / 16) * 100}
                                width={50}
                                strokeColor="#5E38FF"
                                format={() => ""}
                            />
                        </div>
                        <div className="progress-text">
                            <Text strong>
                                You’ve used 14 out of 16 available seats
                            </Text>
                            <div className="sub-text">
                                Upgrade to a business plan to unlock up to 32
                                team members and 200GB storage.
                            </div>
                        </div>
                    </div>
                    <div className="button-group">
                        <Button className="dismiss-btn">Dismiss</Button>
                        <Button className="upgrade-btn1">Upgrade Plan</Button>
                    </div>
                </div>

                {/* Billing Section */}
                <div className="billing-section">
                    <Space className="billing-header">
                        <Title level={4} className="billing-title">
                            Billing
                        </Title>
                        <Dropdown overlay={menu} trigger={["click"]}>
                            <Button type="text" className="options-btn">
                                <EllipsisOutlined
                                    style={{ transform: "rotate(90deg)" }}
                                />
                            </Button>
                        </Dropdown>
                    </Space>
                    <Text className="billing-subtext">
                        Manage your plan and billing history here.
                    </Text>
                </div>

                {/* Card section */}
                <div className="pricing-container">
                    {/* Basic Plan */}
                    <Card className="pricing-card" bordered={false}>
                        <div className="plan-header">
                            <h3>Basic plan</h3>
                            <Badge
                                className="badge"
                                color="transparent"
                                text="Renews in 14 days"
                                dot={false}
                            />
                        </div>
                        <p className="plan-details">Up to 16 team members.</p>
                        <h2 className="plan-price">
                            $10 <span>per month</span>
                        </h2>
                        <Button type="default" className="current-btn" disabled>
                            Current plan
                        </Button>
                    </Card>

                    {/* Business Plan */}
                    <Card className="pricing-card" bordered={false}>
                        <h3 className="business-paln">Business plan</h3>
                        <p className="plan-details">Up to 32 team members.</p>
                        <h2 className="plan-price">
                            $20 <span>per month</span>
                        </h2>
                        <Button type="default" className="upgrade-btn">
                            Upgrade plan
                        </Button>
                    </Card>

                    {/* Enterprise Plan */}
                    <Card className="pricing-card" bordered={false}>
                        <h3 className="business-paln">Enterprise plan</h3>
                        <p className="plan-details">Up to 64 team members.</p>
                        <h2 className="plan-price">
                            $40 <span>per month</span>
                        </h2>
                        <Button type="default" className="upgrade-btn">
                            Upgrade plan
                        </Button>
                    </Card>
                </div>

                {/* Table */}
                <div>
                    <Title level={4} className="billing-title">
                        Billing history
                    </Title>

                    <div className="invoice-table-container">
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            pagination={false}
                            scroll={{ x: true }}
                            showHeader={false} /* Hide table header */
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
