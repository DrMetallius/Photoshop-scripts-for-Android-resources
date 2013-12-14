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
				attrs: {
					state_enabled: false
				},
				postfix: "disabled"
			},
			{
				postfix: "normal"
			}
		]
		makeSelector(selectorData, outputFolder, "drawable");
	}
	
	applyActionBarItemStyle(whiteTheme, false);
	saveForAllDensities(outputFolder, null, makeStateful ? "_normal" : "");
	if (makeStateful) {
		applyActionBarItemStyle(whiteTheme, true);
		saveForAllDensities(outputFolder, null, "_disabled");
	}
		
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