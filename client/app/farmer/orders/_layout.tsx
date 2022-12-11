import React from "react";
import { Tab, Text, TabView } from "@rneui/themed";
import tw from "twrnc";
import Orders from "screens/orders/Orders";
import Transactions from "screens/orders/Transactions";
import ToShip from "screens/orders/ToShip";
import Shipping from "screens/orders/Shipping";

export default () => {
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={tw`bg-green-500 text-green-600`}
        variant="default"
      >
        <Tab.Item
          title="Pending"
          titleStyle={tw` text-green-500 text-[9px]`}
          iconPosition="top"
          containerStyle={tw`bg-white`}
          icon={{ name: "truck", type: "feather", color: "#22c55e" }}
        />
        <Tab.Item
          title="To Ship"
          titleStyle={tw` text-green-500 text-[9px]`}
          iconPosition="top"
          containerStyle={tw`bg-white`}
          icon={{ name: "truck", type: "feather", color: "#22c55e" }}
        />
        <Tab.Item
          title="Shipping"
          titleStyle={tw` text-green-500 text-[9px]`}
          iconPosition="top"
          containerStyle={tw`bg-white`}
          icon={{ name: "truck", type: "feather", color: "#22c55e" }}
        />
        <Tab.Item
          title="History"
          titleStyle={tw` text-green-500 text-[9px]`}
          iconPosition="top"
          containerStyle={tw`bg-white`}
          icon={{ name: "package", type: "feather", color: "#22c55e" }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: "white", width: "100%" }}>
          <Orders />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "white", width: "100%" }}>
          <ToShip />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "white", width: "100%" }}>
          <Shipping />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "white", width: "100%" }}>
          <Transactions />
        </TabView.Item>
      </TabView>
    </>
  );
};
