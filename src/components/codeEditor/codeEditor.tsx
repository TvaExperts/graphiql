import CodeMirror, { EditorState, EditorView } from '@uiw/react-codemirror';
import { GraphQLSchema } from 'graphql';
import { graphql } from 'cm6-graphql';
import { useEffect, useState } from 'react';
import prettifyGraphQLQuery from './prettifyGraphQLQuery';
import ParamsEditor from '../paramsEditor/ParamsEditor';
import { useLocale } from '../../context/local';
import getGraphQlResponse from './getGraphQlResponse';
import createGraphQlSchema from './createGraphQlSchema';
import IconPlay from './IconPlay';
import IconSparkles from './IconSparkles';
import Schema from '../schema/Schema';
import PageWrapper from '../ui/PageWrapper';
import Button from '../ui/Button';

export default function CodeEditor() {
  const { state, dispatch } = useLocale();
  const [error, setError] = useState(false);
  const [getSchema, setGetSchema] = useState<GraphQLSchema>();
  const [isOpenSchema, setIsOpenSchema] = useState<boolean>(false);

  useEffect(() => {
    const saveSchema = async () => {
      const schema = await createGraphQlSchema(state.endpoint);
      setGetSchema(schema);
    };
    saveSchema();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper>
      <div className="w-full bg-fuchsia-900 p-5">
        <input
          value={state.endpoint}
          onChange={(event) => {
            dispatch({ type: 'SET_ENDPOINT', payload: event.target.value });
            setError(false);
          }}
          className="w-full p-1 mb-5"
          type="text"
        />
        {error && <p>Wrong graphql Url</p>}
        <div className="flex items-center justify-center gap-2.5">
          <Button
            type="button"
            onClick={() =>
              getGraphQlResponse(
                state.queryString,
                state.endpoint,
                state.headers,
                state.variables,
                dispatch
              )
            }
          >
            <IconPlay />
          </Button>
          <Button
            type="button"
            onClick={() => {
              dispatch({
                type: 'SET_QUERY_STRING',
                payload: prettifyGraphQLQuery(state.queryString),
              });
              dispatch({
                type: 'SET_VARIABLES',
                payload: prettifyGraphQLQuery(state.variables),
              });
              dispatch({
                type: 'SET_HEADERS',
                payload: prettifyGraphQLQuery(state.headers),
              });
            }}
          >
            <IconSparkles />
          </Button>
          <Button
            type="button"
            onClick={() => setIsOpenSchema((isOpen) => !isOpen)}
          >
            Schema
          </Button>
        </div>
      </div>
      <div className="flex">
        <div className="bg-pink-300 p-4">
          {getSchema ? (
            <CodeMirror
              style={{
                textAlign: 'start',
                whiteSpace: 'pre-wrap',
                wordBreak: 'normal',
                wordWrap: 'break-word',
              }}
              value={state.queryString}
              extensions={[graphql(getSchema), EditorView.lineWrapping]}
              onChange={(event) =>
                dispatch({ type: 'SET_QUERY_STRING', payload: event })
              }
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
              minHeight="300px"
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="bg-pink-300 p-4">
          <CodeMirror
            style={{ textAlign: 'start' }}
            value={
              state.outputQueryData
                ? JSON.stringify(JSON.parse(state.outputQueryData), null, 2)
                : ''
            }
            height="200px"
            extensions={[graphql(), EditorState.readOnly.of(true)]}
            basicSetup={{
              autocompletion: true,
            }}
            width="500px"
            minHeight="300px"
          />
        </div>
      </div>
      <ParamsEditor />
      {isOpenSchema && <Schema clientSchema={getSchema} />}
    </PageWrapper>
  );
}
