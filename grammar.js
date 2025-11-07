/**
 * @file Config grammar for tree-sitter
 * @author IrisuCh <myirisuchan@gmail.com>
 * @license Apache-2.0
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "config",
  extras: ($) => [/[\s\t\r\n]/, $.single_line_comment, $.multi_line_comment],

  rules: {
    source_file: ($) => repeat1($.section),

    single_line_comment: ($) => token(seq("#", /.*/)),

    multi_line_comment: ($) =>
      token(seq("##", repeat(choice(/[^#]+/, /#[^#]/, /##/)), "##")),

    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    localization_key: ($) => seq("$", $.identifier),
    string: ($) => /"[^"]*"/,
    string_or_lkey: ($) => choice($.localization_key, $.string),
    enum: ($) => $.identifier,
    enum_with_block: ($) =>
      seq(field("name", $.identifier), "{", repeat1($.field), "}"),
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
        alias("@", $.meta_field_keyword),
        field("name", $.identifier),
        ":",
        field("type", choice($.enum_with_block, $.values)),
      ),

    field: ($) =>
      seq(field("name", $.identifier), ":", field("value", $.values)),

    option: ($) =>
      seq(
        alias("option", $.option_keyword),
        field("name", $.identifier),
        ":",
        field("type", $.types),
        "{",
        repeat1(choice($.meta_field, $.field)),
        "}",
      ),

    section: ($) =>
      seq(
        alias("section", $.section_keyword),
        field("name", $.identifier),
        optional(
          seq("{", repeat1(choice($.meta_field, $.option, $.section)), "}"),
        ),
      ),
  },
});
