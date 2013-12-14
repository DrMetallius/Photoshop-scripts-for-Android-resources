//@include Styles.jsx
//@include ResizingAndSaving.jsx

#target photoshop

makeIcons(true, true, false);

function makeIcons(whiteTheme, makeStateful, makeV9Icons) {
    var initialState = getState();
    
    var outputFolder = detectFolder();
    if (!outputFolder) return;
    
    var docName = getDocName();
	if (makeV9Icons) {
		var xmlFileContents = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\
    <selector xmlns:android=\"http://schemas.android.com/apk/res/android\">\
    <item android:drawable=\"@drawable/" + docName + "_normal\"/>\
</selector>";
		saveXmlFile(outputFolder, "drawable", xmlFileContents);

		applyMenuIconV9Style();
		saveForAllDensities(outputFolder, "", "_normal");

		resize(32, false);
		resizeLayer(112.5);
	}
    
    if (makeStateful) {
        var xmlFileContentsV11 = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\
    <selector xmlns:android=\"http://schemas.android.com/apk/res/android\">\
    <item android:state_enabled=\"false\" android:drawable=\"@drawable/" + docName + "_disabled\" />\
    <item android:drawable=\"@drawable/" + docName + "_normal\"/>\
</selector>";
        saveXmlFile(outputFolder, makeV9Icons ? "drawable-v11" : "drawable", xmlFileContentsV11);
    }
    
	var ver = makeV9Icons ? "11" : null;
    applyActionBarItemStyle(whiteTheme, false);
    saveForAllDensities(outputFolder, ver, makeStateful ? "_normal" : "");
    if (makeStateful) {
        applyActionBarItemStyle(whiteTheme, true);
        saveForAllDensities(outputFolder, ver, "_disabled");
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