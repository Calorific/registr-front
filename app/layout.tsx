import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import {ConfigProvider} from "antd";
import {AxiosProvider} from "@/app/axiosProvider/axiosProvider";
import "react-datepicker/dist/react-datepicker.css";
import "./global.css"

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Регистр ХСН",
  description: "Регистр пациентов с хронической сердечной недостаточностью",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ru">
      <ConfigProvider theme={{
        components: {
          Table: {
            colorPrimary: '#7EB0C6',
            headerBg: '#E8E8E8',
            headerBorderRadius: 20,
          },
          Select: {
            borderRadius: 20,
            colorBorder: "#E8E8E8",
            borderRadiusSM: 100,
            colorPrimary: '#7EB0C6',
            colorPrimaryHover: '#7EB0C6',
            colorFillSecondary: '#7EB0C6',
            colorIcon: '#FFF',
          },
          TreeSelect: {
            colorPrimary: '#7EB0C6',
            colorPrimaryHover: '#7EB0C6',
            colorPrimaryBorder: '#7EB0C6'

          },
          Pagination: {
            colorPrimary: '#FFF',
            colorPrimaryHover: '#EEE',
            itemActiveBg: '#7EB0C6',
            marginXS: 15,
            borderRadius: 100
          },
          Input: {
            colorBorderBg: '#7EB0C6',
            hoverBorderColor: '#7EB0C6',
            activeBorderColor: '#7EB0C6',
            paddingInline: 25,
            paddingBlock: 6,
            borderRadius: 100
          },
          Button: {
            primaryColor: '#FFF',
            colorPrimary: '#7EB0C6',
            colorPrimaryBg: '#7EB0C6',
            colorPrimaryBorder: '#7EB0C6',
            colorPrimaryHover: '#7EB0C6',
            colorPrimaryBorderHover: '#7EB0C6',
            colorPrimaryBgHover: '#7EB0C6',
            colorPrimaryActive: '#6597AC',
            primaryShadow: "",

            defaultBorderColor: '#7EB0C6',
            defaultHoverBorderColor: '#7EB0C6',
            defaultColor: '#7EB0C6',
            defaultHoverColor: '#7EB0C6',
            defaultActiveColor: '#7EB0C6',
            defaultActiveBorderColor: '#7EB0C6',
            defaultActiveBg: "rgba(49, 69, 78, 0.05)",
            defaultShadow: "",
            lineWidth: 2,
            borderRadius: 100,
            borderRadiusSM: 100,

            colorBgContainerDisabled: "#FFF"
          },
          Radio: {
            colorPrimary: '#7EB0C6',
          },
          DatePicker: {
            borderRadius: 20,
            colorPrimary: '#7EB0C6',
            hoverBorderColor: '#7EB0C6',
          },
          Card: {
            borderRadiusLG: 18
          },
          Tag: {
            defaultBg: '#7EB0C6',
            defaultColor: '#FFF',
            colorTextDescription: '#FFF',
            colorBorder: '#FFF',
            borderRadiusSM: 100,
            paddingXXS: 10,
            lineHeightSM: 2
          }
        }
      }}>
        <AxiosProvider>
          <body className={openSans.className}>
            {children}
          </body>
        </AxiosProvider>
      </ConfigProvider>
    </html>
  );
}
