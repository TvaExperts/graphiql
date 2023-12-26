import React from 'react';

type PlaygroundLayoutProps = {
  controls: React.ReactElement;
  requestEditor: React.ReactElement;
  buttonExecute: React.ReactElement;
  codeViewer: React.ReactElement;
};

function PlaygroundLayout({
  controls,
  requestEditor,
  buttonExecute,
  codeViewer,
}: PlaygroundLayoutProps) {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-56px)]">
      <div className="w-full flex items-center justify-center gap-4 bg-fuchsia-900 p-5">
        {controls}
      </div>
      <div className="flex w-full h-full relative">
        {requestEditor}
        <div className="absolute z-10 flex justify-center w-full top-6">
          {buttonExecute}
        </div>
        {codeViewer}
      </div>
    </div>
  );
}

export default PlaygroundLayout;
