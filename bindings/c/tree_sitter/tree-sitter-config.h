#ifndef TREE_SITTER_CONFIG_H_
#define TREE_SITTER_CONFIG_H_

typedef struct TSLanguage TSLanguage;

#ifdef __cplusplus
extern "C" {
#endif

const TSLanguage *tree_sitter_config(void);

#ifdef __cplusplus
}
#endif

#endif // TREE_SITTER_CONFIG_H_
