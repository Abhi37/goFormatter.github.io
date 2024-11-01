// JsonFormatter.js

import React, { useState, useRef, useEffect } from 'react';
import JSONInput from 'react-json-view';
// import { Controlled as CodeMirror } from 'react-codemirror2';
// import jsonlint from 'jsonlint-mod';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css'; // Dark theme for JSON editor
// import 'codemirror/theme/eclipse.css';  // Light theme for JSON editor
// import 'codemirror/mode/javascript/javascript'; // JSON mode for syntax highlighting
import './JsonFormatter.css';
import { FaExpand, FaCompress, FaCaretSquareRight, FaCaretSquareLeft, FaCopy } from 'react-icons/fa';
import BaseView from '../components/baseView/BaseView';


const JSONFormatter = ({ darkTheme }) => {
    //const getDefaultJson = () => JSON.stringify({ message: "Input JSON here!" }, null, 2);
    const getDefaultJson = '{ "message": "Input JSON here!" }'
    const [jsonInput, setJsonInput] = useState(getDefaultJson); // Input JSON text
    const [jsonParsed, setJsonParsed] = useState(null); // Parsed JSON object for rendering
    const [inputCollapsed, setInputCollapsed] = useState(false); // Flag to collapse input box
    const [selectedJsonPath, setSelectedJsonPath] = useState(''); // JSONPath for selected item
    const [jsonError, setJsonError] = useState(null); // State to track JSON errors
    const formatTimeout = useRef(null);

    useEffect(() => {
        // setJsonInput(getDefaultJson());
        try {
            setJsonParsed(JSON.parse(getDefaultJson));
        } catch (error) {
            setJsonParsed('Invalid JSON');
        }
    }, []);

    const handleJsonInputChange = (e) => {
        const input = e.target.value;
        setJsonInput(input);
        setJsonError(null); // Clear any previous errors

        // Clear the previous timeout if it exists
        if (formatTimeout.current) clearTimeout(formatTimeout.current);

        // Set a new timeout to format JSON after 2 seconds
        formatTimeout.current = setTimeout(() => {
            formatJson(input);
        }, 300); // 2-second delay
    };

    const formatJson = (input) => {
        try {
            const parsed = JSON.parse(input);
            setJsonParsed(parsed);
            setJsonError(null); // Clear errors if JSON is valid
        } catch (error) {
            setJsonParsed(null);
            setJsonError('Invalid JSON'); // Set error if JSON is invalid
        }
    };

    const handleJsonSelect = (info) => {
        setSelectedJsonPath(info.namespace.join('.'));
    };

    const toggleInputCollapse = () => {
        setInputCollapsed(!inputCollapsed);
    };

    const editorOptions = {
        mode: 'application/json',
        theme: darkTheme ? 'material' : 'eclipse',
        lineNumbers: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-lint-markers"],
    };

    return (
        <BaseView tabsEnabled={true} currentTab="json">
        
        
        
        
        <div className={`json-formatter ${darkTheme ? 'dark' : 'light'}`}>            
            <div className="json-container">
            {/* <div className="toolbar">
                        <button onClick={() => alert("Expand All feature coming soon!")}>
                            <FaCopy /> Copy JSON
                        </button>
                        <button onClick={toggleInputCollapse}>
                            {inputCollapsed ? <FaExpand /> : <FaCompress />} Toggle Input
                        </button>
                    </div> */}

                {!inputCollapsed && (
                    <>
                    <div className={`json-input-container ${darkTheme ? 'dark' : 'light'}`}>
                        <textarea
                            value={jsonInput}
                            onLoad={handleJsonInputChange}
                            onChange={handleJsonInputChange}
                            placeholder='{"message":"Input JSON here."}'
                            className={`json-input ${darkTheme ? 'dark' : 'light'}`}
                        />
                        {/* <button onClick={formatJson} className="format-btn">Format JSON</button> */}
                    </div>
                    <div>
                        <button onClick={toggleInputCollapse} className={`input-collapse-btn ${darkTheme ? 'dark' : 'light'}`}>{inputCollapsed ? <FaCaretSquareRight className="input-icon"/> : <FaCaretSquareLeft className="input-icon"/>}</button>
                    </div>
                    </>
                )}




                {/* output box */}

                {/* <div className="toolbar">
                        <button onClick={() => alert("Expand All feature coming soon!")}>
                            <FaExpand /> Expand All
                        </button>
                        <button onClick={() => alert("Collapse All feature coming soon!")}>
                            <FaCompress /> Collapse All
                        </button>
                    </div> */}
                 {inputCollapsed && (
                    <>
                    
          <div>
                    <button onClick={toggleInputCollapse} className={`input-collapse-btn ${darkTheme ? 'dark' : 'light'}`}>{inputCollapsed ? <FaCaretSquareRight className="input-icon"/> : <FaCaretSquareLeft className="input-icon"/>}</button>
                </div>
                    
                    </>
                    
                 )}
                
                <div className={`json-output-container ${inputCollapsed ? 'expanded' : ''}`}>
               
                    {jsonParsed ? (
                        <JSONInput
                            src={jsonParsed}
                            theme={darkTheme ? 'monokai' : 'rjv-default'}
                            enableClipboard={true}
                            onSelect={handleJsonSelect}
                            displayDataTypes={false}
                            displayObjectSize={false}
                            collapsed={false}
                            collapseStringsAfterLength={50}
                            name={null}
                        />
                //         <CodeMirror
                //     value={jsonParsed}
                //     options={{
                //         ...editorOptions,
                //         readOnly: true,
                //     }}
                //     className={darkTheme ? 'json-output-dark' : 'json-output-light'}
                // />
                    ) : (
                        <pre>{jsonParsed ? JSON.stringify(jsonParsed, null, 2) : jsonError || 'Invalid JSON'}</pre>
                    )}
                </div>
            </div>

            
        </div>
        </BaseView>
    );
};

export default JSONFormatter;







// import React, { useState } from 'react';
// import BaseView from '../components/baseView/BaseView';

// const JsonFormatter = () => {
//     const [jsonInput, setJsonInput] = useState('');
//     const [formattedJson, setFormattedJson] = useState('');
//     const [error, setError] = useState(null);

//     const handleFormatJson = () => {
//         try {
//             const parsedJson = JSON.parse(jsonInput); // Parse JSON to catch any syntax errors
//             const prettyJson = JSON.stringify(parsedJson, null, 4); // Format JSON with 4 spaces for readability
//             setFormattedJson(prettyJson);
//             setError(null);
//         } catch (e) {
//             setError('Invalid JSON');
//             setFormattedJson('');
//         }
//     };

//     const handleInputChange = (e) => {
//         setJsonInput(e.target.value);
//     };

//     return (
//         <BaseView tabsEnabled={true} currentTab="json">
//             <h2>JSON Formatter</h2>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//                 <textarea
//                     value={jsonInput}
//                     onChange={handleInputChange}
//                     placeholder="Paste JSON here"
//                     rows="10"
//                     style={{ width: '100%', padding: '10px', borderRadius: '5px', resize: 'none' }}
//                 />
//                 <button onClick={handleFormatJson} style={{ padding: '10px 20px', cursor: 'pointer' }}>
//                     Format JSON
//                 </button>
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//                 <pre
//                     style={{
//                         backgroundColor: '#f5f5f5',
//                         padding: '10px',
//                         borderRadius: '5px',
//                         whiteSpace: 'pre-wrap',
//                         wordWrap: 'break-word',
//                     }}
//                 >
//                     {formattedJson}
//                 </pre>
//             </div>
//         </BaseView>
//     );
// };

// export default JsonFormatter;
