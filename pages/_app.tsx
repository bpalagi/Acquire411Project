// page does not actually display anywhere,
// it is simply used for importing the global styling
import "../styles/globals.scss";

import * as React from "react";

function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
  return <Component {...pageProps} />;
}

export default MyApp;
