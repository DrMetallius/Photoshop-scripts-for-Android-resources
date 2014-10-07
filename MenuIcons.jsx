/*
This file is a part of Photoshop Scripts for Android.

Photoshop Scripts for Android is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Photoshop Scripts for Android is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with Photoshop Scripts for Android. If not, see <http://www.gnu.org/licenses/>.
*/

//@include Styles.jsx
//@include ResizingAndSaving.jsx

#target photoshop

function makeIcons(whiteTheme, makeStateful) {
	var initialState = getState();
	
	var outputFolder = detectFolder();
	if (!outputFolder) return;
	
	var docName = getDocName();
	
	if (makeStateful) {
		var selectorData = [
			{
				state_enabled: false,
				postfix: "disabled"
			},
			{
				postfix: "normal"
			}
		]
		makeSelectorXml(selectorData, outputFolder, "drawable");
	}

	var styleFunctions = [function(style) {applyActionBarItemStyle(whiteTheme, false)}];
	var postfixes = [makeStateful ? "normal" : null];
	if (makeStateful) {
		styleFunctions.unshift(function(style) {applyActionBarItemStyle(whiteTheme, true)});
		postfixes.unshift("disabled");
	}
	saveStyledDrawables(outputFolder, styleFunctions, postfixes);
		
	restoreState(initialState);
}

function applyActionBarItemStyle(whiteTheme, disabled) {
	if (whiteTheme) {
	   setLayerColor(0x33, 0x33, 0x33);
	} else {
	   setLayerColor(0xFF, 0xFF, 0xFF);
	}

	setOpacity(disabled ? 30 : (whiteTheme ? 60 : 80));
}