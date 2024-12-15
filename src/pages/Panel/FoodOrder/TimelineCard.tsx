import {Flex, Grid, Progress, Tag, Typography} from "antd";

const {Title, Text} = Typography
const {useBreakpoint} = Grid

const circleText =
    <Flex vertical>
        <Text>Parcel</Text>
        <Title level={5} style={{margin: 0, color: "orange"}}>2.5 Km</Title>
        <Text>Left</Text>
    </Flex>

export default function TimelineCard() {
    const screens = useBreakpoint();
    const isMobile = screens.xs;

    return (
        <Flex gap={20} justify={isMobile ? "space-between" : "left"}>
            <Title level={4} style={{color: "orange"}}>2064</Title>
          <Flex vertical={isMobile && true} gap={20}>
              <Flex vertical>
                  <Title type={"secondary"} level={5}>Being delivered</Title>
                  <Flex gap={10}>
                      <Text type={"secondary"}>05 Dec</Text>
                      <Tag color={"orange"} style={{backgroundColor: "white"}}>08:05</Tag>
                  </Flex>
              </Flex>
              <Flex vertical gap={8}>
                  <Title level={5} style={{marginBottom: 0}}>Anisul Haque</Title>
                  <Title level={5} style={{margin: 0, color: "blue"}}>Special box</Title>
                  <Text type={"secondary"}>0865 Super Mall</Text>
              </Flex>
          </Flex>
            <Progress type="circle" percent={70} size={90} format={() => circleText}/>
        </Flex>

    )
}