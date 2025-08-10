import * as React from "react";

export function Editor() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 260px", height: "100vh" }}>
      <aside style={{ borderRight: "1px solid #eee", padding: 12 }}>Sidebar (widgets)</aside>
      <main style={{ padding: 16, background: "#f7f7f7" }}>
        <div style={{ background: "white", minHeight: 400, border: "1px dashed #ccc", padding: 20 }}>
          Canvas — hook up your real editor here
        </div>
      </main>
      <aside style={{ borderLeft: "1px solid #eee", padding: 12 }}>Layers Panel</aside>
    </div>
  );
}
