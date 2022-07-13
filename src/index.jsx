import * as React from "react";
import { render } from "react-dom";
import { Theme } from "@twilio-paste/core/theme";
import { Box } from "@twilio-paste/box";
import { Heading } from "@twilio-paste/heading";
import { LogoTwilioIcon } from "@twilio-paste/icons/cjs/LogoTwilioIcon";
import { MessageHistory } from "./MessageHistory";

const { worker } = require("./mocks/browser");
worker.start({
  serviceWorker: {
    /**
     * Use a custom Service Worker script URL to resolve
     * the mock worker served by Codesandbox.
     * @note You DO NOT need this in your application.
     * @see https://mswjs.io/docs/api/setup-worker/start#serviceworker
     */
    url: "/mockServiceWorker.js"
  }
});

function App() {
  return (
    <Theme.Provider theme="default">
      <Box padding="space60">
        <Box display="flex">
          {/* <Box marginRight="space40">
            <LogoTwilioIcon
              title="Twilio SMS Message History"
              size="sizeIcon80"
              color="colorTextBrandHighlight"
            />
          </Box> */}
          <Heading as="h1" variant="heading10">
            SMS Message History
          </Heading>
        </Box>

        <MessageHistory />
      </Box>
    </Theme.Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
