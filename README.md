# Dynamic button plugin for Sketch.app

Dynamic button plug-in for [Sketch.app](http://bohemiancoding.com/sketch/) allows to create buttons with fixed paddings no matter what text you add. 

## Update 
[SOON] Version 2.0
- [add] Some new attractive features 
  
Version 1.2:

- [add] Supports Sketch 3.2
- [add] Now you can select multiple layers to convert them to buttons / update them at once

Version 1.1:

- [add] Support Sketch >= 3.0.2
- [add] Now you can use CSS shorthands (10:10, 10:10:10, 10:10:10:10)
- [add] Feedback messages ('nothing selected', 'wrong format')

Thanks [IngoValente](https://github.com/IngoValente) for CSS shorthands and all other users for appreciation.



## Demo

[![Demo Video](https://dl.dropboxusercontent.com/u/1909742/sketch-plugin/thumb.png)](http://www.youtube.com/watch?v=ZJCYUCU7YxQ)

## Installation
1. [Download Dynamyc button.sketchplugin.](https://github.com/sketchplugins/sketch-dynamic-button/archive/master.zip)
2. Double-click the file inside download folder. Sketch should open automatically and tell you that a new plugin was installed.
  <img src="https://dl.dropboxusercontent.com/u/1909742/sketch-plugin/success.png" alt="installed" width="534" />
3. You should see the Dynamic button entry under the Plugins menu. 
 
  <img src="https://dl.dropboxusercontent.com/u/1909742/sketch-plugin/dropdown.png"/>


## How-to
You can firstly create a structure (like on the image bellow) manually and then use plug-in. Or create text layer and then make a structure automatically using shortcut `Cmd + J`. After you can see a group "flexible button" with text layer (0:0:0:0) and background ('BG').

<img src="https://dl.dropboxusercontent.com/u/1909742/sketch-plugin/2step.png"/>

0:0:0:0 are padings. The syntax is like CSS paddings.

*For e.g. 
padding: 10px 20px 10px 20px (padding: top right bottom left)
10:20:10:20 (top:right:bottom:left)*

Make the paddings you need (in text layer name), select text layer and press `Cmd + J`.

<img src="https://dl.dropboxusercontent.com/u/1909742/sketch-plugin/3step.png"/>

That's it! You create your dynamic button. Now you can change text and press `Cmd + J`. Button will change automatically.

<img src="https://dl.dropboxusercontent.com/u/1909742/sketch-plugin/4step.png"/>

## Changing the Default Keyboard Shortcut

1. Open Sketch's plugins folder. You can do it by choosing
   custom script from the Plugins menu, then click the gear icon and
choose "Open Plugins Folder".
2. Open the file "Dynamic Button.sketchplugin" in text
   editor.
3. The shortcut is on the first line:

    ```
    // just a comment (cmd j)
    ```
    
    Change it.
    
[Scripting documentation](http://bohemiancoding.com/sketch/scripting/)


[Twitter](https://twitter.com/dwht)
[Facebook](https://www.facebook.com/alexander.kudymov)





