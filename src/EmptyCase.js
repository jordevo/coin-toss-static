import React from "react";
export default function NotFound() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setReady(true);
  }, []);

  return ready ? <></> : null;
}
