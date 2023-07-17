function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var react = require('@monaco-editor/react');
var yaml = require('yaml');

function getObject(code, lang) {
  return lang === 'yaml' ? yaml.parse(code) : lang === 'json' ? JSON.parse(code) : {};
}

function NodeRenderer(_ref) {
  var obj = _ref.obj;
  var entries = React.useMemo(function () {
    return Object.entries(obj);
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

function DokEditor(_ref) {
  var editor = _ref.editor,
    language = _ref.language,
    code = _ref.code,
    setCode = _ref.setCode;
  return React__default.createElement("div", null, !editor && React__default.createElement(react.Editor, {
    height: "80vh",
    defaultLanguage: language,
    value: code,
    onChange: function onChange(value) {
      if (value && code !== value) {
        setCode(value);
      }
    }
  }), editor && React__default.createElement(ObjEditor, {
    code: code,
    language: language
  }));
}

exports.DokEditor = DokEditor;
//# sourceMappingURL=index.js.map
