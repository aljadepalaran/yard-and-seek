const vscode = require('vscode');
const VISIBLE_KEY = "yard-and-seek.visible";
const VisibilityManager = require('./visibilityManager');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const hideCommand = vscode.commands.registerCommand('yard-and-seek.hide', async () => {
		const visible = context.globalState.get(VISIBLE_KEY, false);
		// HIDE docstrings
		if(visible){
			await VisibilityManager.hideYardDocstrings();
			await context.globalState.update(VISIBLE_KEY, false);
			vscode.window.showInformationMessage('YARD docstrings have been hidden.');
			return;
		}
		vscode.window.showErrorMessage('YARD docstrings are already hidden.');
	});

	const showCommand = vscode.commands.registerCommand('yard-and-seek.show', async () => {
		const visible = context.globalState.get(VISIBLE_KEY, false);

		if(visible){
			vscode.window.showErrorMessage('YARD docstrings are already visible.');
			return;
		}
		await VisibilityManager.showYardDocstrings();
		await context.globalState.update(VISIBLE_KEY, true);
		vscode.window.showInformationMessage('YARD docstrings have been shown.');
	});

	// Handles changing files (includes opening new files)
	// What about when the file is changed but not switched?
	const changeActiveEditorListener = vscode.window.onDidChangeActiveTextEditor((document) => {
		VisibilityManager.execute(context);
    });

	context.subscriptions.push(hideCommand);
	context.subscriptions.push(showCommand);
	context.subscriptions.push(changeActiveEditorListener);
	vscode.window.showInformationMessage('YARD and Seek loaded.');
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
