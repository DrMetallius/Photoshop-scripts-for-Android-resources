function detectFolder() {
	var outputFolder = null;
	if (app.activeDocument.path != null) {
		var resourcesFolder = new Folder(app.activeDocument.path.parent + "/res");
		if (resourcesFolder.exists) outputFolder = resourcesFolder;
	}
	if (!outputFolder) outputFolder = Folder.selectDialog("Select resources folder");
	
	return outputFolder;
}

function resize(size, relative) {
	var idImgS = charIDToTypeID( "ImgS" );
		var desc89 = new ActionDescriptor();
		var idWdth = charIDToTypeID( "Wdth" );
		var idPxl = charIDToTypeID( relative ? "#Prc" : "#Pxl" );
		desc89.putUnitDouble( idWdth, idPxl, size );
		var idscaleStyles = stringIDToTypeID( "scaleStyles" );
		desc89.putBoolean( idscaleStyles, true );
		var idCnsP = charIDToTypeID( "CnsP" );
		desc89.putBoolean( idCnsP, true );
		var idIntr = charIDToTypeID( "Intr" );
		var idIntp = charIDToTypeID( "Intp" );
		var idbicubicSharper = stringIDToTypeID( "bicubicAutomatic" );
		desc89.putEnumerated( idIntr, idIntp, idbicubicSharper );
	executeAction( idImgS, desc89, DialogModes.NO );
}

function resizeLayer(size) { //Size is given in percents
	app.activeDocument.activeLayer.resize(size, size);
}

function resizeCanvas(size) { //Size is given in pixels
	app.activeDocument.resizeCanvas(size, size);
}

function computeNinePatchLines() {
	var docName = getDocName(false);
	if (!isNinePatch(docName)) return null;
	
	var ninePatchLines = null;
	
	var doc = app.activeDocument;
	var areaCheckingFunctions = [
		function(pos) {return areaIsEmpty(doc, pos, 0);},
		function(pos) {return areaIsEmpty(doc, 0, pos);},
		function(pos) {return areaIsEmpty(doc, pos, doc.height - 1);},
		function(pos) {return areaIsEmpty(doc, doc.width - 1, pos);}
	];
	maxPositions = [doc.width, doc.height, doc.width, doc.height];
	ninePatchLines = new Array();
	for (var pos = 0; pos < areaCheckingFunctions.length; pos++) {
		ninePatchLines.push(findLines(maxPositions[pos], areaCheckingFunctions[pos]));
	}

	return ninePatchLines;
}

function saveForAllDensities(outputFolder, version, postfix, ninePatchLines) {
	if (!ninePatchLines) ninePatchLines = computeNinePatchLines();
	
	var versionStr = version ?  "-v" + version : "";
	saveInFolder(outputFolder, "drawable-mdpi" + versionStr, 100, postfix, ninePatchLines);
	saveInFolder(outputFolder, "drawable-hdpi" + versionStr, 150, postfix, ninePatchLines);
	saveInFolder(outputFolder, "drawable-xhdpi" + versionStr, 200, postfix, ninePatchLines);
	saveInFolder(outputFolder, "drawable-xxhdpi" + versionStr, 300, postfix, ninePatchLines);
	saveInFolder(outputFolder, "drawable-xxxhdpi" + versionStr, 400, postfix, ninePatchLines);
};

function getDocName(removeNinePatchPostfix) {
	var docName = activeDocument.name.slice(0, -".psd".length);
	if (removeNinePatchPostfix && isNinePatch(docName)) docName = docName.slice(0, -".9".length);
	return docName;
}

function isNinePatch(docName) {
	return docName.indexOf(".9", docName.length - ".9".length) !== -1;
}

function createFile(outputFolder, subFolder, postfix, ext, removeNinePatchPostfix) {
	var subFolder = new Folder(outputFolder.toString() + "/" + subFolder);
	if (!subFolder.exists) subFolder.create();
	
	var docName = getDocName(removeNinePatchPostfix);
	if (!removeNinePatchPostfix && isNinePatch(docName)) {
		docName = docName.slice(0, -".9".length);
		ext = ".9" + ext;
	}
	return new File(subFolder.fullName + "/" + docName + postfix + ext);
}

//If this is a nine-patch, the document must contain at least two layers, content on top and rasterized black lines on the bottom
function saveInFolder(outputFolder, subFolder, scaling, postfix, ninePatchLines) {
	var opts = new ExportOptionsSaveForWeb(); 
	opts.format = SaveDocumentType.PNG; 
	opts.PNG8 = false; 
	opts.transparency = true; 
	opts.quality = 100;
	
	var state = getState();
	
	if (ninePatchLines) {
		var doc = app.activeDocument;	
		doc.resizeCanvas(doc.width - 2, doc.height - 2);
		resize(scaling, true);
		doc.resizeCanvas(doc.width + 2, doc.height + 2);
		drawLines(doc, scaling / 100, ninePatchLines);
	} else {
		resize(scaling, true);
	}
	activeDocument.exportDocument(createFile(outputFolder, subFolder, postfix, ".png", false), ExportType.SAVEFORWEB, opts);
	restoreState(state);
}

function findLines(maxPos, areaCheckingFunction) {
	var doc = app.activeDocument;
	doc.activeLayer = doc.layers[doc.layers.length - 1];

	var positions = new Array();
	var lineFound = false;
	for (var pos = 0; pos < maxPos; pos++) {
		var areaEmpty = areaCheckingFunction(pos);
		if (!areaEmpty && !lineFound) {
			lineFound = true;
			positions.push(pos);
		} else if (areaEmpty && lineFound) {
			lineFound = false;
			positions.push(pos);
		}
	}
	return positions;
}
   
function selectBounds(doc, b) {
	doc.selection.select([[b[0], b[1]], [b[2], b[1]], [b[2], b[3]], [b[0], b[3]]]);
}

function areaIsEmpty(doc, x, y) {
   var state = getState();
   
	if (doc.colorSamplers.length == 0) {
		var colorSampler = doc.colorSamplers.add([x,y]);
	} else {
		var colorSampler = doc.colorSamplers[0];
		colorSampler.move([x, y]);
	}

   var areaEmpty;
   try {
	   areaEmpty = colorSampler.color.rgb.hexValue !== "000000";
   } catch (e) {
	   areaEmpty = true;
   }

	restoreState(state);
	
	return areaEmpty;
}

function drawLines(doc, factor, lines) {
	var layerIndex = doc.layers.length - 1;
	doc.activeLayer = doc.layers[layerIndex];
	
	doc.artLayers[layerIndex].rasterize(RasterizeType.ENTIRELAYER);
	doc.selection.selectAll();
	doc.selection.clear();
	
	var black = new SolidColor();
	black.rgb.red = 0;
	black.rgb.green = 0;
	black.rgb.blue = 0;
	
	var selectionFunctions = [
		function(start, end) {selectBounds(doc, [start, 0, end, 1])},
		function(start, end) {selectBounds(doc, [0, start, 1, end])},
		function(start, end) {selectBounds(doc, [start, doc.height - 1, end, doc.height])},
		function(start, end) {selectBounds(doc, [doc.width - 1, start, doc.width, end])}
	];
	
	for (var pos = 0; pos < lines.length; pos++) {
		var line = lines[pos];
		for (var lineStart = 0, lineEnd = 1; lineStart + 1 < line.length; lineStart += 2, lineEnd += 2) {
			var newStart = Math.ceil((line[lineStart] - 1) * factor + 1);
			var newEnd = Math.floor((line[lineEnd] - 1) * factor + 1);
			selectionFunctions[pos](newStart, newEnd);
			doc.selection.fill(black);
		}
	}
}

function makeSelectorXml(selectorData, outputFolder, subFolderPath) {
	var docName = getDocName();
	var xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\
<selector xmlns:android=\"http://schemas.android.com/apk/res/android\">\n";
	for (var pos = 0; pos < selectorData.length; pos++) {
		xml += "\t<item";
		var lineDesc = selectorData[pos];
		for (var attrName in lineDesc) {
			if (attrName.lastIndexOf("state_", 0) === 0) {
				xml += " android:" + attrName + "=\"" + lineDesc[attrName] + "\"";
			}
		}	
		xml += " android:drawable=\"@drawable/" + docName + "_" + lineDesc.postfix + "\"/>\n";
	}
	xml += "</selector>";
	
	saveXmlFile(outputFolder, subFolderPath, xml);
}

function saveXmlFile(outputFolder, subFolderPath, fileContents) {
	var file = createFile(outputFolder, subFolderPath, "", ".xml", true);
	if (!file.open("w")) return false;
	file.write(fileContents);
	if (!file.close()) return false;
	
	return true;
}

function saveStyledDrawables(outputFolder, styleFunctions, postfixes) {
	var doc = app.activeDocument;
	var initialState = getState();
	var ninePatchLines = computeNinePatchLines();

	for (var pos = 0; pos < styleFunctions.length; pos++) {
		doc.activeLayer = doc.layers[0];
		clearAllEffects();

		var style = newStyle();
		styleFunctions[pos](style);
		applyStyle(style);

		saveForAllDensities(outputFolder, null, "_" + postfixes[pos], ninePatchLines);

		restoreState(initialState);
	}
}

function getState() {
	return app.activeDocument.activeHistoryState;
}

function restoreState(state) {
	return app.activeDocument.activeHistoryState = state;
}