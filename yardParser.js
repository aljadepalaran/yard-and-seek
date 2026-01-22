const vscode = require('vscode');

class YARDParser {
    constructor() {
        this.YARD_TAG_REGEX = /#\s*@\w+/g;
    }

    /**
     * Return ranges for entire lines containing YARD tags
     * instead of just the tag itself.
     * @param {vscode.TextDocument} doc 
     * @returns {vscode.Range[]}
     */
    parseDocument(doc) {
        const ranges = [];
        const text = doc.getText();
        let match;

        while ((match = this.YARD_TAG_REGEX.exec(text))) {
            // Get the line number
            const startPos = doc.lineAt(doc.positionAt(match.index).line).range.start;
            const endPos = doc.lineAt(doc.positionAt(match.index).line).range.end;
            ranges.push(new vscode.Range(startPos, endPos));
        }

        return ranges;
    }

    /**
     * Return ranges for entire YARD comment blocks
     * Consecutive lines starting with # are grouped
     * @param {vscode.TextDocument} doc 
     * @returns {vscode.Range[]}
     */
    parseBlocks(doc) {
        const ranges = [];
        const lineCount = doc.lineCount;

        let blockStart = null;
        let blockEnd = null;

        for (let i = 0; i < lineCount; i++) {
            const line = doc.lineAt(i);
            if (line.text.trim().startsWith('#')) {
                if (!blockStart) blockStart = line.range.start;
                blockEnd = line.range.end;
            } else if (blockStart) {
                ranges.push(new vscode.Range(blockStart, blockEnd));
                blockStart = null;
                blockEnd = null;
            }
        }

        // Handle last block
        if (blockStart && blockEnd) {
            ranges.push(new vscode.Range(blockStart, blockEnd));
        }

        return ranges;
    }
}

module.exports = YARDParser;