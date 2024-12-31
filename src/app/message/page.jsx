"use client";

import dynamic from "next/dynamic";

const Chat = dynamic(() => import("./chat"), {
  ssr: false, // Disable server-side rendering
});

function Page() {
  return (
    <main>
      <Chat />
    </main>
  );
}

export default Page;
