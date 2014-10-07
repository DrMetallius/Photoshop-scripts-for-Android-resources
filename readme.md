# Photoshop Scripts for Android

## What the heck is this?

This is a collection of different scripts to manipulate resources in Android. When you create resources for Android, you have to create separate versions of the same resource for different densities. The resource could have several states (like an action bar icon), and this the problem worse. These scripts allows you to generate all the resources from a single file.

## How to install them?

No installation required: just download the scripts and unpack them into a folder. Obviously enough, you need to have Photoshop installed on your computer. The scripts were tested on Photoshop CS6.

## How to use them?

### Saving a resource in multiple densities

The script **MakeForAllDensities** creates versions of the resource for the following densities: mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi.

1. Create a resource for the *mdpi* density. It should be a vector image, otherwise it won't scale well.
2. **If the file is a nine-patch**: make sure that you have drawn the nine-patch lines on a separate layer at the very bottom of the image.
3. Save the file on the drive with the appropriate name (say, the file for the resource *ic_launcher* should be named *ic_launcher.psd*). Don't forget the *.9* postfix if the file is a nine-patch (for example, *ic_launcher.9.psd*). The best place to save the file is a subfolder in your Android project folder, because this way the scripts will detect the *res* folder automatically.
4. Make sure that the document is currently open and active in Photoshop.
5. Run the script **MakeForAllDensities** by double clicking it.

### Making action bar icons

The scripts **MakeActionBarIcons** create various versions of action bar icons. The color in the name of the script indicates the theme in the application. If the script has the word **Stateful**, it means that the icon will exist in two states: regular and disabled. An XML selector will be generated automatically.

To apply one of these scripts perform all the steps described for the script **MakeForAllDensities**, except that the document should now also have only one layer.

##License

Copyright 2013 Alexander Gazarov. Contact at malcolm [dot] soft [at] gmail [dot] com.

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