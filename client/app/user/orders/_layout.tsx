import React from "react";
import { Tab, Text, TabView } from "@rneui/themed";
import tw from "twrnc";
import Delivery from "screens/orders/Delivery";
import History from "screens/orders/History";

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
          title="Delivery"
          titleStyle={tw` text-green-500 text-base`}
          iconPosition="top"
          containerStyle={tw`bg-white`}
          icon={{ name: "truck", type: "feather", color: "#22c55e" }}
        />
        <Tab.Item
          title="History"
          titleStyle={tw` text-green-500 text-base`}
          iconPosition="top"
          containerStyle={tw`bg-white`}
          icon={{ name: "package", type: "feather", color: "#22c55e" }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: "white", width: "100%" }}>
          <Delivery />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "white", width: "100%" }}>
          <History />
        </TabView.Item>
      </TabView>
    </>
  );
};
