package tree_sitter_config_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_config "github.com/nethalym/tree-sitter-config/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_config.Language())
	if language == nil {
		t.Errorf("Error loading Config grammar")
	}
}
