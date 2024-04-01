// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
 
function activate(context) {
    let disposable = vscode.window.onDidChangeTextEditorSelection((e) => {
        const { selections, textEditor } = e;
        if (!textEditor || selections.length !== 1) {
            return;
        }

        const firstLine = textEditor.document.lineAt(0).range;
        const sixthLine = textEditor.document.lineAt(5).range;

        const isSelectionWithinFirstFiveLines = selections[0].intersection(firstLine) !== undefined;
        const isSelectionWithinSixthLine = selections[0].intersection(sixthLine) !== undefined;

        if (isSelectionWithinFirstFiveLines && !isSelectionWithinSixthLine) {
            const newPosition = new vscode.Position(5, 0);
            const newSelection = new vscode.Selection(newPosition, newPosition);
            textEditor.selection = newSelection;
        }
    });
    context.subscriptions.push(disposable);
} 

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
