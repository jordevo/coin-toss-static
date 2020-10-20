import React from "react";
export default function NotFound() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setReady(true);
  }, []);

  return ready ? (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  ) : null;
}
