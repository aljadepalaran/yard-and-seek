const vscode = require('vscode');
const HIDDEN_KEY = "yard-and-seek.visible";
const YARDParser = require('./yardParser');

// Create a decoration type for YARD tags
const hiddenYardStrings = vscode.window.createTextEditorDecorationType({
    color: '#FF5733',
    fontStyle: 'italic'
});
const visibleYardStrings = vscode.window.createTextEditorDecorationType({
    color: '#1eff00',
    fontStyle: 'italic'
});

class VisibilityManager {
    // Used when navigating between files and we dont want to lose state
    static async execute(context) {
        const visible = await context.globalState.get(HIDDEN_KEY, false);

        if (visible) {
            await this.showYardDocstrings();
        } else {
            await this.hideYardDocstrings();
        }
    }

    static async showYardDocstrings() {
        // Fetch open editor
        const editor = vscode.window.activeTextEditor;

        // Get ranges of YARD tags
        const ranges = new YARDParser().parseDocument(editor.document);
        
        editor.setDecorations(hiddenYardStrings, []);
        editor.setDecorations(visibleYardStrings, ranges);
        vscode.window.showInformationMessage('YARD docstrings have been shown.');
    }

    static async hideYardDocstrings() {
        // Fetch open editor
        const editor = vscode.window.activeTextEditor;

        // Get ranges of YARD tags
        const ranges = new YARDParser().parseDocument(editor.document);
        
        editor.setDecorations(hiddenYardStrings, []);
        editor.setDecorations(hiddenYardStrings, ranges);
        vscode.window.showInformationMessage('YARD docstrings have been hidden.');
    }
}

module.exports = VisibilityManager;
