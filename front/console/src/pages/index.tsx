import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../main";
import { initGlobalState, MicroAppStateActions } from "qiankun";

// 初始化 state
const actions: MicroAppStateActions = initGlobalState({
  path: "/",
});

const { Header, Content, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

const App: React.FC = () => {
  const navigate = useNavigate();
  const menus = useGlobalContext().menus;
  const [menuOptions, setMenuOptions] = useState<MenuItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // 跳转路由
  function jump(path: string) {
    actions.setGlobalState({ path });
    navigate(path);
  }

  useEffect(() => {
    setMenuOptions(
      menus.map((menu) => {
        return {
          key: menu.path,
          label: menu.title,
        };
      })
    );
  }, [menus]);

  useEffect(() => {
    // 查看当前菜单是否有路由选中
    const currentApp = menus.find((x) => {
      return `${location?.pathname}/`?.includes(`${x.path}/`);
    });

    if (currentApp) {
      // 如果当前菜单中有路由选择，设置菜单选中状态并触发子应用接收 basePath
      const path = currentApp?.path || "/";
      setSelectedKeys([path]);
      actions.setGlobalState({ path });
    } else {
      // 如果当前不在菜单中。
      if (menus?.length) {
        const path = menus?.[0]?.path;
        jump(path);
        setSelectedKeys([path]);
        actions.setGlobalState({ path });
      }
    }
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible defaultCollapsed={false} style={{ color: "white" }}>
        <div
          style={{
            lineHeight: "60px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            userSelect: "none",
            borderBottom: "1px solid gray",
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}
        >
          此处应有一个 LOGO
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuOptions}
          selectedKeys={selectedKeys}
          onClick={(node) => {
            jump(node.key);
            setSelectedKeys(node.keyPath);
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ background: "white", padding: " 0 16px" }}>
          <b>QianKun 微前端演示项目</b>
        </Header>
        <Content>
          <div id="child" style={{ position: "relative" }}></div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
