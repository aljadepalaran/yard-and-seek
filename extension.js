const vscode = require('vscode');
const HIDDEN_KEY = "yard-and-seek.visible";

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const hideCommand = vscode.commands.registerCommand('yard-and-seek.hide', async () => {
		const visible = context.globalState.get(HIDDEN_KEY, false);
		if(visible){
			await context.globalState.update(HIDDEN_KEY, false);
			vscode.window.showInformationMessage('YARD docstrings have been hidden.');
			return;
		}
		vscode.window.showErrorMessage('YARD docstrings are already hidden.');
	});

	const showCommand = vscode.commands.registerCommand('yard-and-seek.show', async () => {
		const visible = context.globalState.get(HIDDEN_KEY, false);
		if(visible){
			vscode.window.showErrorMessage('YARD docstrings are already visible.');
			return;
		}
		await context.globalState.update(HIDDEN_KEY, true);
		vscode.window.showInformationMessage('YARD docstrings have been shown.');
	});

	context.subscriptions.push(hideCommand);
	context.subscriptions.push(showCommand);
	vscode.window.showInformationMessage('YARD and Seek loaded.');
	// create subscription to hook into file open
	// subscription will run a service that will determine whether to hide or show docstrings
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
