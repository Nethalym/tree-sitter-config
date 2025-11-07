/**
 * @file Config grammar for tree-sitter
 * @author IrisuCh <myirisuchan@gmail.com>
 * @license Apache-2.0
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "config",

  rules: {
    source_file: ($) => repeat1($.section),

    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    localization_key: ($) => seq("$", $.identifier),
    string: ($) => /"[^"]*"/,
    string_or_lkey: ($) => choice($.localization_key, $.string),
    enum: ($) => $.identifier,
    enum_with_block: ($) => seq($.identifier, "{", repeat1($.field), "}"),
    integer: ($) => /-?[0-9]+/,
    float: ($) => /-?[0-9]+\.[0-9]*/,
    boolean: ($) => choice("true", "false"),
    array: ($) =>
      seq(
        "[",
        optional(seq($.values, repeat(seq(",", $.values)), optional(","))),
        "]",
      ),

    values: ($) =>
      choice($.integer, $.float, $.boolean, $.enum, $.string_or_lkey, $.array),

    types: ($) => choice("String", "UInt", "Int", "Float", "Enum"),

    meta_field: ($) =>
      seq(
        "@",
        field("name", $.identifier),
        ":",
        field(
          "type",
          choice($.string_or_lkey, $.types, $.enum, $.enum_with_block),
        ),
      ),

    field: ($) =>
      seq(field("name", $.identifier), ":", field("value", $.values)),

    option: ($) =>
      seq(
        "option",
        $.identifier,
        ":",
        $.types,
        "{",
        repeat1(choice($.meta_field, $.field)),
        "}",
      ),

    section: ($) =>
      seq(
        "section",
        field("name", $.identifier),
        optional(
          seq("{", repeat1(choice($.meta_field, $.option, $.section)), "}"),
        ),
      ),
  },
});
