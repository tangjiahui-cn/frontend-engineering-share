import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import "antd/dist/antd.min.css";
import { useNavigate, Outlet } from "react-router-dom";

const list = [
  { route: "/menu", name: "菜单管理" },
  { route: "/app", name: "子应用管理" },
];
export default function () {
  const [activeKey, setActiveKey] = useState<string>("");
  const navigate = useNavigate();

  function handleChange(route: string) {
    setActiveKey(route);
    navigate(route);
  }

  useEffect(() => {
    const item = list.find((x) =>
      `${window.location.pathname}/`.includes(`${x.route}/`)
    );
    if (item) {
      setActiveKey(item?.route);
    } else {
      const firstNode = list?.[0];
      handleChange(firstNode.route);
    }
  }, []);

  return (
    <div style={{ background: "white", padding: "0 16px", minHeight: "100%" }}>
      <Tabs onChange={handleChange} activeKey={activeKey}>
        {list.map((x) => (
          <Tabs.TabPane key={x.route} tab={x.name} />
        ))}
      </Tabs>
      <Outlet />
    </div>
  );
}
