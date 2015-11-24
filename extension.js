// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-sort-lines" is now active!'); 

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	var disposable = vscode.commands.registerCommand('extension.sortLinesAsc', function () {
		sortLines(true);
	});
	
	var disposable2 = vscode.commands.registerCommand('extension.sortLinesDesc', function () {
		sortLines(false);
	});
	
	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

function sortLines(ascendingOrder) {
	var editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}
		
		var end = editor.selections[0].anchor.line;
		var start = editor.selections[0].active.line;
		
		if (end < start) {
			var temp = start;
			start = end;
			end = temp;
		}
		
		var endChar = editor.document._lines[end].length;
		
		var startPos = new vscode.Position(start, 0);
		var endPos = new vscode.Position(end, endChar);
		
		var range = new vscode.Range(startPos, endPos);
		
		var textArr = editor.document._lines.slice(start, end+1);
		
		console.log(textArr);	
		
		textArr.sort();
		if (!ascendingOrder) {
			textArr.reverse();
		}
		
		console.log(textArr);
		
		var replaceString = textArr[0];
		for (var i = 1; i < textArr.length; i++) {
			replaceString += '\n' + textArr[i];
		}
		var workspaceEdit = new vscode.WorkspaceEdit();
		
		workspaceEdit.replace(editor.document._uri, range, replaceString);
		vscode.workspace.applyEdit(workspaceEdit);
}

exports.activate = activate;