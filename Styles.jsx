function clearAllEffects() {
	var iddlfx = charIDToTypeID( "dlfx" );
		var desc18 = new ActionDescriptor();
		var idnull = charIDToTypeID( "null" );
			var ref8 = new ActionReference();
			var idLyr = charIDToTypeID( "Lyr " );
			var idOrdn = charIDToTypeID( "Ordn" );
			var idTrgt = charIDToTypeID( "Trgt" );
			ref8.putEnumerated( idLyr, idOrdn, idTrgt );
		desc18.putReference( idnull, ref8 );
     try { //In case there are no effects
         executeAction( iddlfx, desc18, DialogModes.NO );
     } catch (ex) {}
}

function newStyle() {
	var desc = new ActionDescriptor();
	var idScl = charIDToTypeID( "Scl " );
	var idPrc = charIDToTypeID( "#Prc" );
	desc.putUnitDouble( idScl, idPrc, 100.000000 );
	
	return desc;
}

function applyStyle(style) {
	var idsetd = charIDToTypeID( "setd" );
		var desc = new ActionDescriptor();
		var idnull = charIDToTypeID( "null" );
			var ref = new ActionReference();
			var idPrpr = charIDToTypeID( "Prpr" );
			var idLefx = charIDToTypeID( "Lefx" );
			ref.putProperty( idPrpr, idLefx );
			var idLyr = charIDToTypeID( "Lyr " );
			var idOrdn = charIDToTypeID( "Ordn" );
			var idTrgt = charIDToTypeID( "Trgt" );
			ref.putEnumerated( idLyr, idOrdn, idTrgt );
		desc.putReference( idnull, ref );
		var idT = charIDToTypeID( "T   " );
		var idLefx = charIDToTypeID( "Lefx" );
		desc.putObject( idT, idLefx, style );
	executeAction( idsetd, desc, DialogModes.NO );
}

function addStroke(style, r, g, b, size) {
	var effect = new ActionDescriptor();
	var idenab = charIDToTypeID( "enab" );
	effect.putBoolean( idenab, true );
	var idStyl = charIDToTypeID( "Styl" );
	var idFStl = charIDToTypeID( "FStl" );
	var idOutF = charIDToTypeID( "OutF" );
	effect.putEnumerated( idStyl, idFStl, idOutF );
	var idPntT = charIDToTypeID( "PntT" );
	var idFrFl = charIDToTypeID( "FrFl" );
	var idSClr = charIDToTypeID( "SClr" );
	effect.putEnumerated( idPntT, idFrFl, idSClr );
	var idMd = charIDToTypeID( "Md  " );
	var idBlnM = charIDToTypeID( "BlnM" );
	var idNrml = charIDToTypeID( "Nrml" );
	effect.putEnumerated( idMd, idBlnM, idNrml );
	var idOpct = charIDToTypeID( "Opct" );
	var idPrc = charIDToTypeID( "#Prc" );
	effect.putUnitDouble( idOpct, idPrc, 100.000000 );
	var idSz = charIDToTypeID( "Sz  " );
	var idPxl = charIDToTypeID( "#Pxl" );
	effect.putUnitDouble( idSz, idPxl, size );
	var idClr = charIDToTypeID( "Clr " );
		var desc104 = new ActionDescriptor();
		var idRd = charIDToTypeID( "Rd  " );
		desc104.putDouble( idRd, r );
		var idGrn = charIDToTypeID( "Grn " );
		desc104.putDouble( idGrn, g );
		var idBl = charIDToTypeID( "Bl  " );
		desc104.putDouble( idBl, b );
	var idRGBC = charIDToTypeID( "RGBC" );
	effect.putObject( idClr, idRGBC, desc104 );
	
	var idFrFX = charIDToTypeID( "FrFX" );
	style.putObject( idFrFX, idFrFX, effect );
}

function addGradient(style, startR, startG, startB, endR, endG, endB, angle) {
	var idGrad = charIDToTypeID( "Grad" );
		var desc22 = new ActionDescriptor();
		var idNm = charIDToTypeID( "Nm  " );
		desc22.putString( idNm, """Custom""" );
		var idGrdF = charIDToTypeID( "GrdF" );
		var idGrdF = charIDToTypeID( "GrdF" );
		var idCstS = charIDToTypeID( "CstS" );
		desc22.putEnumerated( idGrdF, idGrdF, idCstS );
		var idIntr = charIDToTypeID( "Intr" );
		desc22.putDouble( idIntr, 4096.000000 );
		var idClrs = charIDToTypeID( "Clrs" );
			var list5 = new ActionList();
				var desc23 = new ActionDescriptor();
				var idClr = charIDToTypeID( "Clr " );
					var desc24 = new ActionDescriptor();
					var idRd = charIDToTypeID( "Rd  " );
					desc24.putDouble( idRd, startR);
					var idGrn = charIDToTypeID( "Grn " );
					desc24.putDouble( idGrn, startG);
					var idBl = charIDToTypeID( "Bl  " );
					desc24.putDouble( idBl, startB);
				var idRGBC = charIDToTypeID( "RGBC" );
				desc23.putObject( idClr, idRGBC, desc24 );
				var idType = charIDToTypeID( "Type" );
				var idClry = charIDToTypeID( "Clry" );
				var idUsrS = charIDToTypeID( "UsrS" );
				desc23.putEnumerated( idType, idClry, idUsrS );
				var idLctn = charIDToTypeID( "Lctn" );
				desc23.putInteger( idLctn, 0 );
				var idMdpn = charIDToTypeID( "Mdpn" );
				desc23.putInteger( idMdpn, 50 );
			var idClrt = charIDToTypeID( "Clrt" );
			list5.putObject( idClrt, desc23 );
				var desc25 = new ActionDescriptor();
				var idClr = charIDToTypeID( "Clr " );
					var desc26 = new ActionDescriptor();
					var idRd = charIDToTypeID( "Rd  " );
					desc26.putDouble( idRd, endR );
					var idGrn = charIDToTypeID( "Grn " );
					desc26.putDouble( idGrn, endG );
					var idBl = charIDToTypeID( "Bl  " );
					desc26.putDouble( idBl, endB );
				var idRGBC = charIDToTypeID( "RGBC" );
				desc25.putObject( idClr, idRGBC, desc26 );
				var idType = charIDToTypeID( "Type" );
				var idClry = charIDToTypeID( "Clry" );
				var idUsrS = charIDToTypeID( "UsrS" );
				desc25.putEnumerated( idType, idClry, idUsrS );
				var idLctn = charIDToTypeID( "Lctn" );
				desc25.putInteger( idLctn, 4096 );
				var idMdpn = charIDToTypeID( "Mdpn" );
				desc25.putInteger( idMdpn, 50 );
			var idClrt = charIDToTypeID( "Clrt" );
			list5.putObject( idClrt, desc25 );
		desc22.putList( idClrs, list5 );
		var idTrns = charIDToTypeID( "Trns" );
			var list6 = new ActionList();
				var desc27 = new ActionDescriptor();
				var idOpct = charIDToTypeID( "Opct" );
				var idPrc = charIDToTypeID( "#Prc" );
				desc27.putUnitDouble( idOpct, idPrc, 100.000000 );
				var idLctn = charIDToTypeID( "Lctn" );
				desc27.putInteger( idLctn, 0 );
				var idMdpn = charIDToTypeID( "Mdpn" );
				desc27.putInteger( idMdpn, 50 );
			var idTrnS = charIDToTypeID( "TrnS" );
			list6.putObject( idTrnS, desc27 );
				var desc28 = new ActionDescriptor();
				var idOpct = charIDToTypeID( "Opct" );
				var idPrc = charIDToTypeID( "#Prc" );
				desc28.putUnitDouble( idOpct, idPrc, 100.000000 );
				var idLctn = charIDToTypeID( "Lctn" );
				desc28.putInteger( idLctn, 4096 );
				var idMdpn = charIDToTypeID( "Mdpn" );
				desc28.putInteger( idMdpn, 50 );
			var idTrnS = charIDToTypeID( "TrnS" );
			list6.putObject( idTrnS, desc28 );
		desc22.putList( idTrns, list6 );
	var idGrdn = charIDToTypeID( "Grdn" );
	desc21.putObject( idGrad, idGrdn, desc22 );
	var idAngl = charIDToTypeID( "Angl" );
	var idAng = charIDToTypeID( "#Ang" );
	desc21.putUnitDouble( idAngl, idAng, angle );
	var idType = charIDToTypeID( "Type" );
	var idGrdT = charIDToTypeID( "GrdT" );
	var idLnr = charIDToTypeID( "Lnr " );
	desc21.putEnumerated( idType, idGrdT, idLnr );
	var idRvrs = charIDToTypeID( "Rvrs" );
	desc21.putBoolean( idRvrs, false );
	var idDthr = charIDToTypeID( "Dthr" );
	desc21.putBoolean( idDthr, false );
	var idAlgn = charIDToTypeID( "Algn" );
	desc21.putBoolean( idAlgn, true );
	var idScl = charIDToTypeID( "Scl " );
	var idPrc = charIDToTypeID( "#Prc" );
	desc21.putUnitDouble( idScl, idPrc, 100.000000 );
	var idOfst = charIDToTypeID( "Ofst" );
		var desc29 = new ActionDescriptor();
		var idHrzn = charIDToTypeID( "Hrzn" );
		var idPrc = charIDToTypeID( "#Prc" );
		desc29.putUnitDouble( idHrzn, idPrc, 0.000000 );
		var idVrtc = charIDToTypeID( "Vrtc" );
		var idPrc = charIDToTypeID( "#Prc" );
		desc29.putUnitDouble( idVrtc, idPrc, 0.000000 );
	var idPnt = charIDToTypeID( "Pnt " );
	desc21.putObject( idOfst, idPnt, desc29 );
	
	var idGrFl = charIDToTypeID( "GrFl" );
	style.putObject( idGrFl, idGrFl, desc21 );
}

function addInnerShadow(style, r, g, b, opacity, angle, distance, size) {
	var desc7 = new ActionDescriptor();
	var idenab = charIDToTypeID( "enab" );
	desc7.putBoolean( idenab, true );
	var idMd = charIDToTypeID( "Md  " );
	var idBlnM = charIDToTypeID( "BlnM" );
	var idMltp = charIDToTypeID( "Mltp" );
	desc7.putEnumerated( idMd, idBlnM, idMltp );
	var idClr = charIDToTypeID( "Clr " );
		var desc8 = new ActionDescriptor();
		var idRd = charIDToTypeID( "Rd  " );
		desc8.putDouble( idRd, r );
		var idGrn = charIDToTypeID( "Grn " );
		desc8.putDouble( idGrn, g );
		var idBl = charIDToTypeID( "Bl  " );
		desc8.putDouble( idBl, b );
	var idRGBC = charIDToTypeID( "RGBC" );
	desc7.putObject( idClr, idRGBC, desc8 );
	var idOpct = charIDToTypeID( "Opct" );
	var idPrc = charIDToTypeID( "#Prc" );
	desc7.putUnitDouble( idOpct, idPrc, opacity );
	var iduglg = charIDToTypeID( "uglg" );
	desc7.putBoolean( iduglg, true );
	var idlagl = charIDToTypeID( "lagl" );
	var idAng = charIDToTypeID( "#Ang" );
	desc7.putUnitDouble( idlagl, idAng, 120.000000 );
	var idDstn = charIDToTypeID( "Dstn" );
	var idPxl = charIDToTypeID( "#Pxl" );
	desc7.putUnitDouble( idDstn, idPxl, distance );
	var idCkmt = charIDToTypeID( "Ckmt" );
	var idPxl = charIDToTypeID( "#Pxl" );
	desc7.putUnitDouble( idCkmt, idPxl, 0 );
	var idblur = charIDToTypeID( "blur" );
	var idPxl = charIDToTypeID( "#Pxl" );
	desc7.putUnitDouble( idblur, idPxl, size );
	var idNose = charIDToTypeID( "Nose" );
	var idPrc = charIDToTypeID( "#Prc" );
	desc7.putUnitDouble( idNose, idPrc, 0 );
	var idAntA = charIDToTypeID( "AntA" );
	desc7.putBoolean( idAntA, false );
	var idTrnS = charIDToTypeID( "TrnS" );
		var desc9 = new ActionDescriptor();
		var idNm = charIDToTypeID( "Nm  " );
		desc9.putString( idNm, """Linear""" );
	var idShpC = charIDToTypeID( "ShpC" );
	desc7.putObject( idTrnS, idShpC, desc9 );
				
	var idIrSh = charIDToTypeID( "IrSh" );
	style.putObject( idIrSh, idIrSh, desc7 );
}

function setOpacity(opacity) {
	app.activeDocument.activeLayer.opacity = opacity;
}

function setFillOpacity(opacity) {
	var doc = app.activeDocument;
	var artLayer = doc.artLayers.getByName(doc.activeLayer.name);
	artLayer.fillOpacity = opacity;
}

function addColorOverlay(style, r, g, b, opacity) {
	var desc84 = new ActionDescriptor();
	var idenab = charIDToTypeID( "enab" );
	desc84.putBoolean( idenab, true );
	var idMd = charIDToTypeID( "Md  " );
	var idBlnM = charIDToTypeID( "BlnM" );
	var idNrml = charIDToTypeID( "Nrml" );
	desc84.putEnumerated( idMd, idBlnM, idNrml );
	var idOpct = charIDToTypeID( "Opct" );
	var idPrc = charIDToTypeID( "#Prc" );
	desc84.putUnitDouble( idOpct, idPrc, opacity);
	var idClr = charIDToTypeID( "Clr " );
		var desc85 = new ActionDescriptor();
		var idRd = charIDToTypeID( "Rd  " );
		desc85.putDouble( idRd, r );
		var idGrn = charIDToTypeID( "Grn " );
		desc85.putDouble( idGrn, g );
		var idBl = charIDToTypeID( "Bl  " );
		desc85.putDouble( idBl, b );
	var idRGBC = charIDToTypeID( "RGBC" );
	desc84.putObject( idClr, idRGBC, desc85 );
				
	var idSoFi = charIDToTypeID( "SoFi" );
	style.putObject( idSoFi, idSoFi, desc84 );
}

function setLayerColor(r, g, b) {
	var idsetd = charIDToTypeID( "setd" );
		var desc132 = new ActionDescriptor();
		var idnull = charIDToTypeID( "null" );
			var ref31 = new ActionReference();
			var idcontentLayer = stringIDToTypeID( "contentLayer" );
			var idOrdn = charIDToTypeID( "Ordn" );
			var idTrgt = charIDToTypeID( "Trgt" );
			ref31.putEnumerated( idcontentLayer, idOrdn, idTrgt );
		desc132.putReference( idnull, ref31 );
		var idT = charIDToTypeID( "T   " );
			var desc133 = new ActionDescriptor();
			var idClr = charIDToTypeID( "Clr " );
				var desc134 = new ActionDescriptor();
				var idRd = charIDToTypeID( "Rd  " );
				desc134.putDouble( idRd, r );
				var idGrn = charIDToTypeID( "Grn " );
				desc134.putDouble( idGrn, g );
				var idBl = charIDToTypeID( "Bl  " );
				desc134.putDouble( idBl, b );
			var idRGBC = charIDToTypeID( "RGBC" );
			desc133.putObject( idClr, idRGBC, desc134 );
		var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
		desc132.putObject( idT, idsolidColorLayer, desc133 );
	executeAction( idsetd, desc132, DialogModes.NO );
}