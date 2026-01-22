const vscode = require('vscode');
const VISIBLE_KEY = "yard-and-seek.visible";
const VisibilityManager = require('./visibilityManager');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const hideCommand = vscode.commands.registerCommand('yard-and-seek.hide', async () => {
		const visible = context.globalState.get(VISIBLE_KEY, false);

		if(visible){
			await VisibilityManager.hideYardDocstrings();
			set_state(context, 'hidden');
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
		set_state(context, 'visible');
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

function set_state(context, stateString){
	const state = stateString === 'hidden' ? false : true;

	context.globalState.update(VISIBLE_KEY, state);
}

module.exports = {
	activate,
	deactivate
}
