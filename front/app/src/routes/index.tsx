import React from "react";
import App from "../pages";
import Page1 from "../pages/page1";
import Page2 from "../pages/page2";
import Page2_1 from "../pages/page2/setting";

export default [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/page1",
        element: <Page1 />,
      },
      {
        path: "/page2",
        element: <Page2 />,
        children: [
          {
            path: "/page2/page1",
            element: <Page2_1 />,
          },
        ],
      },
    ],
  },
];
