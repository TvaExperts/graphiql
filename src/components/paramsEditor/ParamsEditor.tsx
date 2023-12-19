import { useState, useEffect } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import Button from '../ui/Button';
import RequestOptions from '../../types/enums/requestOptions';
import { IParamsEditorProps } from '../../types/interfaces/IParamsEditorProps';
import { IEditorParamsState } from '../../types/interfaces/IEditorParamsState';

function ParamsEditor(props: IParamsEditorProps) {
  const [isOpenVariables, setVariablesOpen] = useState(false);
  const [params, setParams] = useState<IEditorParamsState>({
    variables: '',
    headers: '',
  });

  const [isOpenHeaders, setHeadersOpen] = useState(false);

  const { updateParams } = props;

  useEffect(() => {
    updateParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const handleChange = (type: RequestOptions) => (value: string) => {
    setParams({ ...params, [type]: value });
  };

  return (
    <div>
      <div className="flex bg-indigo-900 p-4 text-white">
        <Button
          className={
            isOpenVariables
              ? 'bg-sky-500 rounded-l p-2 transition-colors duration-300'
              : 'bg-sky-500/50 rounded-l p-2 text-slate-400 transition-colors duration-300'
          }
          onClick={() => {
            setVariablesOpen(!isOpenVariables);
            setHeadersOpen(false);
          }}
        >
          Variables
        </Button>
        <Button
          className={
            isOpenHeaders
              ? 'bg-sky-500 rounded-l p-2 transition-colors duration-300'
              : 'bg-sky-500/50 rounded-l p-2 text-slate-400 transition-colors duration-300'
          }
          onClick={() => {
            setHeadersOpen(!isOpenHeaders);
            setVariablesOpen(false);
          }}
        >
          Headers
        </Button>
      </div>
      {isOpenVariables && (
        <div className="bg-pink-400 p-2">
          <CodeMirror
            style={{
              textAlign: 'start',
              whiteSpace: 'pre-wrap',
              wordBreak: 'normal',
              wordWrap: 'break-word',
            }}
            value={params.variables}
            extensions={[graphql(), EditorView.lineWrapping]}
            onChange={handleChange(RequestOptions.VARIABLES)}
            basicSetup={{
              highlightActiveLine: true,
              autocompletion: true,
              foldGutter: true,
              dropCursor: true,
              allowMultipleSelections: true,
              indentOnInput: true,
              bracketMatching: true,
              closeBrackets: true,
              lintKeymap: true,
            }}
            width="auto"
            minHeight="80px"
          />
        </div>
      )}
      {isOpenHeaders && (
        <div className="bg-emerald-400 p-2">
          <CodeMirror
            style={{
              textAlign: 'start',
              whiteSpace: 'pre-wrap',
              wordBreak: 'normal',
              wordWrap: 'break-word',
            }}
            value={params.headers}
            extensions={[graphql(), EditorView.lineWrapping]}
            onChange={handleChange(RequestOptions.HEADERS)}
            basicSetup={{
              highlightActiveLine: true,
              autocompletion: true,
              foldGutter: true,
              dropCursor: true,
              allowMultipleSelections: true,
              indentOnInput: true,
              bracketMatching: true,
              closeBrackets: true,
              lintKeymap: true,
            }}
            width="auto"
            minHeight="80px"
          />
        </div>
      )}
    </div>
  );
}

export default ParamsEditor;
