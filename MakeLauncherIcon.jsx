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

//@include ResizingAndSaving.jsx

#target photoshop
    
var outputFolder = detectFolder();
if (outputFolder) saveForAllDensities(outputFolder, 0, "", null, true);