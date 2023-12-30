import React, { useState } from 'react';
import { ParamsEditor } from './editors/ParamsEditor';
import { cn } from '../../utils/cn';

enum TabsParams {
  variables = 'query variables',
  headers = 'headers html',
}

type ParamsProps = {
  headers: string;
  variables: string;
  setHeaders: (newHeaders: string) => void;
  setVariables: (newVariables: string) => void;
};

export function Params({
  headers,
  variables,
  setHeaders,
  setVariables,
}: ParamsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabsParams>(TabsParams.variables);

  const { value, onChange } = {
    [TabsParams.headers]: { value: headers, onChange: setHeaders },
    [TabsParams.variables]: { value: variables, onChange: setVariables },
  }[activeTab];

  function handleChangeTab(newTab: TabsParams) {
    if (!isOpen) {
      setIsOpen(true);
    }
    setActiveTab(newTab);
  }

  function handleClickHeader(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (!(event.target as Element).closest('[data-id=tab-button]')) {
      setIsOpen((o) => !o);
    }
  }

  return (
    <div className="w-full bg-gray-50">
      <div className="text-sm font-medium text-center text-gray-500 ">
        <div
          className={cn('flex cursor-row-resize', {
            'cursor-s-resize': isOpen,
          })}
          onClick={handleClickHeader}
        >
          {Object.entries(TabsParams).map(([, tabParams]) => {
            return (
              <button
                key={tabParams}
                data-id="tab-button"
                type="button"
                onClick={() => handleChangeTab(tabParams)}
                className={cn(
                  `inline-block p-4 uppercase text-gray-400 hover:text-gray-600 border-b-[3px] hover:border-gray-300`,
                  {
                    'text-blue-controls hover:text-blue-controls border-blue-controls hover:border-blue-controls':
                      activeTab === tabParams,
                  }
                )}
              >
                {tabParams}
              </button>
            );
          })}
        </div>
      </div>
      {isOpen && <ParamsEditor value={value} onChange={onChange} />}
    </div>
  );
}
