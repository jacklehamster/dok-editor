import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { parse, stringify } from 'yaml';

function getObject(code, lang) {
  return lang === 'yaml' ? parse(code) : lang === 'json' ? JSON.parse(code) : {};
}
function updateCodeForLanguage(code, previousLanguage, language) {
  var obj = getObject(code, previousLanguage);
  var newLang = language;
  if (newLang === 'yaml') {
    return stringify(obj);
  } else if (newLang === 'json') {
    return JSON.stringify(obj, null, "  ") + "\n";
  }
  return;
}

function NodeRenderer(_ref) {
  var obj = _ref.obj;
  var entries = !obj ? [] : Object.entries(obj);
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

function Select(_ref) {
  var setEditor = _ref.setEditor,
    setLanguage = _ref.setLanguage;
  var _useState = useState("yaml"),
    option = _useState[0],
    setOption = _useState[1];
  var options = useMemo(function () {
    return {
      "yaml": function yaml(option) {
        setEditor(false);
        setLanguage(option);
        setOption(option);
      },
      "json": function json(option) {
        setEditor(false);
        setLanguage(option);
        setOption(option);
      },
      "editor": function editor(option) {
        setEditor(true);
        setOption(option);
      }
    };
  }, [setEditor, setLanguage]);
  return React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row",
      gap: 10
    }
  }, Object.entries(options).map(function (_ref2) {
    var key = _ref2[0],
      action = _ref2[1];
    var selected = key === option;
    return React.createElement("div", {
      key: key,
      style: {
        margin: 5,
        padding: 5,
        backgroundColor: selected ? "black" : undefined,
        color: selected ? "snow" : "blue",
        cursor: selected ? undefined : "pointer"
      },
      onClick: function onClick() {
        return action(key);
      }
    }, key);
  }));
}

function useCode(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    _ref$initialLanguage = _ref.initialLanguage,
    initialLanguage = _ref$initialLanguage === void 0 ? "yaml" : _ref$initialLanguage,
    initialCode = _ref.initialCode;
  var _useState = useState(initialLanguage),
    language = _useState[0],
    setLanguage = _useState[1];
  var _useState2 = useState(initialCode != null ? initialCode : "null"),
    code = _useState2[0],
    setCode = _useState2[1];
  return {
    language: language,
    setLanguage: useCallback(function (newLang) {
      setLanguage(function (oldLanguage) {
        setCode(function (code) {
          var _updateCodeForLanguag;
          return (_updateCodeForLanguag = updateCodeForLanguage(code, oldLanguage, newLang)) != null ? _updateCodeForLanguag : "";
        });
        return newLang;
      });
    }, [setCode, setLanguage]),
    code: code,
    setCode: setCode
  };
}

function DokEditor(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    codeChanged = _ref.code,
    languageChanged = _ref.language,
    onCodeChange = _ref.onCodeChange,
    onLanguageChange = _ref.onLanguageChange;
  var _useCode = useCode({
      initialCode: codeChanged,
      initialLanguage: languageChanged
    }),
    language = _useCode.language,
    _setLanguage = _useCode.setLanguage,
    code = _useCode.code,
    setCode = _useCode.setCode;
  useEffect(function () {
    if (codeChanged) {
      setCode(codeChanged);
    }
  }, [codeChanged, setCode]);
  useEffect(function () {
    if (languageChanged) {
      _setLanguage(languageChanged);
    }
  }, [languageChanged, _setLanguage]);
  var _useState = useState(false),
    editor = _useState[0],
    setEditor = _useState[1];
  var updateCode = useCallback(function (value) {
    setCode(function (code) {
      if (value && code !== value) {
        setCode(value);
        onCodeChange === null || onCodeChange === void 0 ? void 0 : onCodeChange(value);
        return value;
      }
      return code;
    });
  }, [onCodeChange, setCode]);
  return React.createElement("div", null, React.createElement(Select, {
    setEditor: setEditor,
    setLanguage: function setLanguage(language) {
      _setLanguage(language);
      onLanguageChange === null || onLanguageChange === void 0 ? void 0 : onLanguageChange(language);
    }
  }), !editor && React.createElement(Editor, {
    height: "80vh",
    language: language,
    value: code,
    onChange: updateCode
  }), editor && React.createElement(ObjEditor, {
    code: code,
    language: language
  }));
}

export { DokEditor, getObject, updateCodeForLanguage, useCode };
//# sourceMappingURL=index.modern.js.map
