import XCTest
import SwiftTreeSitter
import TreeSitterConfig

final class TreeSitterConfigTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_config())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Config grammar")
    }
}
