import React, { useMemo } from 'react';

import ChartCard from '../components/ChartCard';
import { useGlobal } from '../layout/Global';

const BIPage = () => {
  const { isMobile } = useGlobal();

  const list = useMemo(
    () => Array.from(new Array(10)).fill((_: any, i: number) => i),
    [],
  );

  return (
    <div className="flex flex-col space-y-4 p-4">
      <ChartCard key="x" cardKey="x" />

      {/* <div
        className="w-full grid gap-4 mx-auto items-center"
        style={{
          gridTemplateColumns: isMobile
            ? `repeat(1, 1fr)`
            : `repeat(auto-fit, minmax(480px, 1fr))`,
        }}
      >
        {list.map((_, i) => (
          <ChartCard key={i} cardKey={i.toString()} />
        ))}
      </div> */}
    </div>
  );
};

export default BIPage;
