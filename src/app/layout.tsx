"use client";
import "antd/dist/reset.css";
import { Layout, Breadcrumb, theme, ConfigProvider } from "antd";
import { Inter } from "next/font/google";
import { useState } from "react";
import MenuLayout from "@/components/Menu";
import { PokeProvider } from "@/providers/Pokemons";

const inter = Inter({ subsets: ["latin"] });
const { Header, Content, Footer, Sider } = Layout;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <html lang="pt">
      <body className={inter.className}>
        <PokeProvider>
          <ConfigProvider
          // theme={{
          //   token: {
          //     colorPrimary: "#00b96b",
          //     colorBgLayout: "#f6f6f6f4",
          //     colorBgContainer: "#e8eee9",
          //   },
          // }}
          >
            <Layout style={{ minHeight: "100vh" }}>
              <Sider
                theme="light"
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
              >
                <MenuLayout />
              </Sider>
              <Layout>
                <Content style={{ margin: "0 16px" }}>
                  <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb>
                  <div
                    style={{
                      padding: 24,
                      minHeight: 360,
                      background: colorBgContainer,
                    }}
                  >
                    {children}
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Gustavo Morais ©2023
                </Footer>
              </Layout>
            </Layout>
          </ConfigProvider>
        </PokeProvider>
      </body>
    </html>
  );
}
