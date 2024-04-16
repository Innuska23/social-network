import React from "react";
import Preloader from "../common/Preloader/Preloader";

export function withSuspense<WCP extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<WCP>
) {
  return (props: WCP) => (
    <React.Suspense fallback={<Preloader />}>
      <WrappedComponent {...props} />
    </React.Suspense>
  );
};
