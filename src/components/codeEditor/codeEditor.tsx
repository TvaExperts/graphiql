import CodeMirror, { EditorState, EditorView } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ParamsEditor from '../paramsEditor/ParamsEditor';
import { IEditorParamsState } from '../../types/interfaces/IEditorParamsState';

export default function CodeEditor() {
  const [value, setValue] = useState(`query myChar($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        name
        id
      }
    }
  }
  `);
  const [urlValue, setUrlValue] = useState(
    'https://rickandmortyapi.com/graphql'
  );
  const [output, setOutput] = useState('');
  const [error, setError] = useState(false);
  const [editorParams, setEditorParams] = useState({
    variables: '',
    additionalHeaders: '',
  });

  const updateParamsEditor = (data: IEditorParamsState) => {
    setEditorParams(data);
  };

  const onError = (err: Error) => {
    toast.error(err.message, {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const helpR = async (query: string, url: string) => {
    const { variables } = editorParams;

    let body = JSON.stringify({ query });

    if (variables.length > 0) {
      try {
        const checkVariables = JSON.parse(variables);
        body = JSON.stringify({ query, variables: checkVariables });
      } catch (er) {
        if (er instanceof Error) onError(er);
      }
    }

    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body,
    })
      .then((res) => res.json())
      .catch(() => setError(true));
    setOutput(JSON.stringify(result));
  };

  return (
    <div>
      <div style={{ backgroundColor: 'blueviolet', padding: '15px' }}>
        <input
          value={urlValue}
          onChange={(event) => {
            setUrlValue(event.target.value);
            setError(false);
          }}
          style={{ width: '100%', padding: '3px' }}
          type="text"
        />
        {error && <p>Wrong graphql Url</p>}
        <button
          style={{
            border: 'solid 1px black',
            backgroundColor: '#3B82F6',
            color: '#fff',
            padding: '10px',
            borderRadius: '14px',
            marginTop: '10px',
          }}
          type="button"
          onClick={() => helpR(value, urlValue)}
        >
          Run
        </button>
        <button
          style={{
            border: 'solid 1px black',
            backgroundColor: '#3B82F6',
            color: '#fff',
            padding: '10px',
            borderRadius: '14px',
            margin: '10px',
          }}
          type="button"
        >
          Prettifying
        </button>
        <button
          style={{
            border: 'solid 1px black',
            backgroundColor: '#3B82F6',
            color: '#fff',
            padding: '10px',
            borderRadius: '14px',
            margin: '10px',
          }}
          type="button"
        >
          Schema
        </button>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ backgroundColor: 'pink', padding: '15px' }}>
          <CodeMirror
            style={{
              textAlign: 'start',
              whiteSpace: 'pre-wrap',
              wordBreak: 'normal',
              wordWrap: 'break-word',
            }}
            value={value}
            extensions={[graphql(), EditorView.lineWrapping]}
            onChange={(event) => setValue(event)}
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
            width="500px"
            minHeight="500px"
          />
        </div>
        <div style={{ backgroundColor: 'pink', padding: '15px' }}>
          <CodeMirror
            style={{ textAlign: 'start' }}
            value={output ? JSON.stringify(JSON.parse(output), null, 2) : ''}
            height="200px"
            extensions={[graphql(), EditorState.readOnly.of(true)]}
            basicSetup={{
              autocompletion: true,
            }}
            minWidth="500px"
            minHeight="500px"
          />
        </div>
      </div>
      <ParamsEditor updateParams={updateParamsEditor} />
    </div>
  );
}
