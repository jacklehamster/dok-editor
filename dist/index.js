function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var react = require('@monaco-editor/react');
var yaml = require('yaml');

function getObject(code, lang) {
  return lang === 'yaml' ? yaml.parse(code) : lang === 'json' ? JSON.parse(code) : {};
}
function updateCodeForLanguage(code, previousLanguage, language) {
  var obj = getObject(code, previousLanguage);
  var newLang = language;
  if (newLang === 'yaml') {
    return yaml.stringify(obj);
  } else if (newLang === 'json') {
    return JSON.stringify(obj, null, "  ") + "\n";
  }
  return;
}

function NodeRenderer(_ref) {
  var obj = _ref.obj;
  var entries = React.useMemo(function () {
    return !obj ? [] : Object.entries(obj);
  }, [obj]);
  return React__default.createElement("div", null, entries.map(function (_ref2) {
    var key = _ref2[0],
      value = _ref2[1];
    return React__default.createElement("div", {
      key: key,
      style: {
        marginLeft: 5,
        backgroundColor: Array.isArray(obj) ? "lemonchiffon" : "beige"
      }
    }, React__default.createElement("div", {
      style: {
        border: Array.isArray(obj) ? 1 : 0,
        marginTop: 5,
        borderStyle: "solid",
        padding: 5,
        display: typeof value === "object" ? "block" : "flex"
      }
    }, !Array.isArray(obj) && React__default.createElement("div", {
      style: {
        backgroundColor: "yellow",
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        width: "fit-content",
        height: "fit-content"
      }
    }, key, ": "), React__default.createElement("div", null, typeof value === "object" ? React__default.createElement(NodeRenderer, {
      obj: value
    }) : "" + value)));
  }));
}

function ObjEditor(_ref) {
  var language = _ref.language,
    code = _ref.code;
  var obj = React.useMemo(function () {
    return getObject(code, language);
  }, [code, language]);
  return React__default.createElement(NodeRenderer, {
    obj: obj
  });
}

function Select(_ref) {
  var setEditor = _ref.setEditor,
    setLanguage = _ref.setLanguage;
  var _useState = React.useState("yaml"),
    option = _useState[0],
    setOption = _useState[1];
  var options = React.useMemo(function () {
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
  return React__default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row",
      gap: 10
    }
  }, Object.entries(options).map(function (_ref2) {
    var key = _ref2[0],
      action = _ref2[1];
    var selected = key === option;
    return React__default.createElement("div", {
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
  var _useState = React.useState(initialLanguage),
    language = _useState[0],
    setLanguage = _useState[1];
  var _useState2 = React.useState(initialCode != null ? initialCode : "null"),
    code = _useState2[0],
    setCode = _useState2[1];
  return {
    language: language,
    setLanguage: React.useCallback(function (newLang) {
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
    initialCode = _ref.code,
    initialLanguage = _ref.language,
    onCodeChange = _ref.onCodeChange;
  var _useCode = useCode({
      initialCode: initialCode,
      initialLanguage: initialLanguage
    }),
    language = _useCode.language,
    setLanguage = _useCode.setLanguage,
    code = _useCode.code,
    setCode = _useCode.setCode;
  var _useState = React.useState(false),
    editor = _useState[0],
    setEditor = _useState[1];
  var updateCode = React.useCallback(function (value) {
    setCode(function (code) {
      if (value && code !== value) {
        setCode(value);
        onCodeChange === null || onCodeChange === void 0 ? void 0 : onCodeChange(value);
        return value;
      }
      return code;
    });
  }, [onCodeChange, setCode]);
  return React__default.createElement("div", null, React__default.createElement(Select, {
    setEditor: setEditor,
    setLanguage: setLanguage
  }), !editor && React__default.createElement(react.Editor, {
    height: "80vh",
    language: language,
    value: code,
    onChange: updateCode
  }), editor && React__default.createElement(ObjEditor, {
    code: code,
    language: language
  }));
}

exports.DokEditor = DokEditor;
exports.useCode = useCode;
//# sourceMappingURL=index.js.map
