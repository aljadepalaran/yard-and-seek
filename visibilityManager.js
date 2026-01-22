const vscode = require('vscode');
const editor = vscode.window.activeTextEditor;
const document = editor.document;

class VisibilityManager {
    static async showYardDocstrings() {
        // Logic to show YARD docstrings
        await editor.edit(editBuilder => {
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(document.getText().length)
            );
            editBuilder.replace(fullRange, 'DOCSTRINGS ARE SHOWN');
        });
    }

    static async hideYardDocstrings() {
        // Logic to hide YARD docstrings
        await editor.edit(editBuilder => {
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(document.getText().length)
            );
            editBuilder.replace(fullRange, 'DOCSTRINGS ARE HIDDEN');
        });
    }
}

module.exports = VisibilityManager;
