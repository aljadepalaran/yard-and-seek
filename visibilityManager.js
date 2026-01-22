const vscode = require('vscode');
const HIDDEN_KEY = "yard-and-seek.visible";

class VisibilityManager {
    static async execute(context) {
        const visible = await context.globalState.get(HIDDEN_KEY, false);

        // Should be visible
        if (visible) {
            await this.showYardDocstrings();
        } else {
            // Should be hidden
            await this.hideYardDocstrings();
        }
    }

    static async showYardDocstrings() {
        const editor = vscode.window.activeTextEditor;
        const document = editor.document;

        await editor.edit(editBuilder => {
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(document.getText().length)
            );
            editBuilder.replace(fullRange, 'DOCSTRINGS ARE SHOWN\nDOCSTRINGS ARE SHOWN\nDOCSTRINGS ARE SHOWN\nDOCSTRINGS ARE SHOWN');
        });
    }

    static async hideYardDocstrings() {
        const editor = vscode.window.activeTextEditor;
        const document = editor.document;

        await editor.edit(editBuilder => {
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(document.getText().length)
            );
            editBuilder.replace(fullRange, 'DOCSTRINGS ARE HIDDEN\nDOCSTRINGS ARE HIDDEN\nDOCSTRINGS ARE HIDDEN\nDOCSTRINGS ARE HIDDEN');
        });
    }
}

module.exports = VisibilityManager;
