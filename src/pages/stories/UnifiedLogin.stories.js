import React from "react";
import UnifiedLogin from "~/pages/Login/UnifiedLogin";

export default {
  title: "pages/Login/UnifiedLogin",
  component: UnifiedLogin,
};

const Template = (args) => <UnifiedLogin {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
