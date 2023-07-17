import React, { useMemo } from 'react';
import { Editor } from '@monaco-editor/react';
import { parse } from 'yaml';

function getObject(code, lang) {
  return lang === 'yaml' ? parse(code) : lang === 'json' ? JSON.parse(code) : {};
}

function NodeRenderer(_ref) {
  var obj = _ref.obj;
  var entries = useMemo(function () {
    return Object.entries(obj);
  }, [obj]);
  return React.createElement("div", null, entries.map(function (_ref2) {
    var key = _ref2[0],
      value = _ref2[1];
    return React.createElement("div", {
      key: key,
      style: {
        marginLeft: 5,
        backgroundColor: Array.isArray(obj) ? "lemonchiffon" : "beige"
      }
    }, React.createElement("div", {
      style: {
        border: Array.isArray(obj) ? 1 : 0,
        marginTop: 5,
        borderStyle: "solid",
        padding: 5,
        display: typeof value === "object" ? "block" : "flex"
      }
    }, !Array.isArray(obj) && React.createElement("div", {
      style: {
        backgroundColor: "yellow",
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        width: "fit-content",
        height: "fit-content"
      }
    }, key, ": "), React.createElement("div", null, typeof value === "object" ? React.createElement(NodeRenderer, {
      obj: value
    }) : "" + value)));
  }));
}

function ObjEditor(_ref) {
  var language = _ref.language,
    code = _ref.code;
  var obj = useMemo(function () {
    return getObject(code, language);
  }, [code, language]);
  return React.createElement(NodeRenderer, {
    obj: obj
  });
}

function DokEditor(_ref) {
  var editor = _ref.editor,
    language = _ref.language,
    code = _ref.code,
    setCode = _ref.setCode;
  return React.createElement("div", null, !editor && React.createElement(Editor, {
    height: "80vh",
    defaultLanguage: language,
    value: code,
    onChange: function onChange(value) {
      if (value && code !== value) {
        setCode(value);
      }
    }
  }), editor && React.createElement(ObjEditor, {
    code: code,
    language: language
  }));
}

export { DokEditor };
//# sourceMappingURL=index.modern.js.map
