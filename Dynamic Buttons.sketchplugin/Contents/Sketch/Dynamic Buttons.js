// Dynamic Button Plugin (cmd j)
/*
  Original code from https://github.com/ddwht/sketch-dynamic-button
  Fixed for Sketch 3.2 by Bohemian Coding
*/

var onRun = function(context) {
    var dataKey = 'buttonPaddings';

    function addLayerOfRectType(parent, rect) {
        var style = MSDefaultStyle.defaultStyle();
        var rectShape = MSRectangleShape.alloc().init();
        rectShape.frame = MSRect.rectWithRect(rect);
        var container = MSShapeGroup.shapeWithPath(rectShape);
        var fill = container.style().addStylePartOfType(0);
        fill.color = MSColor.colorWithSVGString("#ddd");
        parent.addLayers([container]);
        return container;
    }

    function alert(msg, title) {
        title = title || "alert";
        var app = [NSApplication sharedApplication];
        [app displayDialog: msg withTitle: title];
    }

    function getBackgroundForGroup(group) {
        var groupLayers = [group layers];
        for (var i = 0; i < [groupLayers count]; i++) {
            var layer = [groupLayers objectAtIndex: i];
            if (layer.name().toLowerCase() == "bg") {
                return layer;
            }
        }
        return false;
    }

    function getButtonDimensionsForLayer(layer, inputPaddings) {
        var frame = [layer frame];
        var layerHeight = [frame height],
            layerWidth = [frame width],
            layerX = [frame x],
            layerY = [frame y];

        var offsetTop, offsetBottom, offsetRight, offsetLeft;
        switch (inputPaddings.length) {
            case 1:
                layer.name = '0:0:0:0';
                offsetTop = offsetRight = offsetBottom = offsetLeft = 0;
                break;
            case 2:
                offsetTop = offsetBottom = parseInt(inputPaddings[0]) || 0;
                offsetRight = offsetLeft = parseInt(inputPaddings[1]) || 0;
                break;
            case 3:
                offsetTop = parseInt(inputPaddings[0]) || 0;
                offsetRight = offsetLeft = parseInt(inputPaddings[1]) || 0;
                offsetBottom = parseInt(inputPaddings[2]) || 0;
                break;
            case 4:
                offsetTop = parseInt(inputPaddings[0]) || 0;
                offsetRight = parseInt(inputPaddings[1]) || 0;
                offsetBottom = parseInt(inputPaddings[2]) || 0;
                offsetLeft = parseInt(inputPaddings[3]) || 0;
                break;
            default:
                alert('Wrong format', 'Error');
        }
        return {
            x: layerX,
            y: layerY,
            width: layerWidth,
            height: layerHeight,
            offsetTop: offsetTop,
            offsetBottom: offsetBottom,
            offsetLeft: offsetLeft,
            offsetRight: offsetRight,
            totalWidth: (layerWidth + offsetLeft + offsetRight),
            totalHeight: (layerHeight + offsetTop + offsetBottom)
        }
    }

    function loadJSONData(context, path) {
        // load contents
        var contents = [NSString stringWithContentsOfFile: path encoding: NSUTF8StringEncoding error: false];

        // get data from JSON
        var data;
        try {
            data = JSON.parse(contents);
        }
        catch(e) {
            context.document.showMessage("There was an error parsing data. Please make sure it's valid.");
            return;
        }

        return data;
    }

    function getData(context, key) {
        var fileURL = context.plugin.urlForResourceNamed('data.json');
        var filePath = fileURL.path();
        var jsonData = loadJSONData(context, filePath);

        return jsonData[key];
    }

    function saveData(context, key, value) {
        var fileURL = context.plugin.urlForResourceNamed('data.json');
        var filePath = fileURL.path();
        var jsonData = loadJSONData(context, filePath);

        jsonData[key] = value + ""; // convert NSTaggedPointerString to Javascript string, otherwise the "value" will not serialize correctly.

        try {
            var nsstr = [@"" stringByAppendingString: JSON.stringify(jsonData)]; // convert to NSString
            nsstr.dataUsingEncoding_(NSUTF8StringEncoding).writeToFile_atomically_(filePath, true);
        }
        catch(e) {
            context.document.showMessage("There was an error parsing data. Please make sure it's valid.");
            return;
        }
    }

    var selection = context.selection;
    // for (var i=0; i < context.selection.length(); i++) {
    //   context.selection[i].setIsSelected(false);
    // }
    var doc = context.document;

    if ([selection count] === 0) {
        alert('You need to select at least one layer', 'Selection is empty');
    } else {
        var previousPaddings = getData(context, dataKey);
        var inputPaddingsStr = doc.askForUserInput_initialValue("Please input the paddings of the button", previousPaddings);

        var inputPaddings = inputPaddingsStr.split(":");

        // de-select all the selected layer at first
        for (var i = 0; i < [selection count]; i++) {
            var currentLayer = [selection objectAtIndex: i];
            currentLayer.setIsSelected(false);
        }

        for (var i = 0; i < [selection count]; i++) {
            var currentLayer = [selection objectAtIndex: i],
                parentGroup = [currentLayer parentGroup];

            var bg = getBackgroundForGroup(parentGroup),
                buttonDimensions = getButtonDimensionsForLayer(currentLayer, inputPaddings);

            if(!bg) {
                // Create group and background
                var group = MSLayerGroup.new();
                var groupFrame = group.frame();
                groupFrame.setConstrainProportions(false);
                group.setName('Dynamic group');

                parentGroup.addLayers([group]);
                parentGroup.removeLayer(currentLayer);
                group.addLayers([currentLayer]);
                group.resizeToFitChildrenWithOption(0);

                var BGLayer = addLayerOfRectType(group, currentLayer.rect());
                BGLayer.name = "BG";
                BGLayer.setIsSelected(true);
                [NSApp sendAction: 'moveBackward:' to: nil from: doc];
                BGLayer.setIsSelected(false);

                bg = BGLayer;
            }

            // Update background
            var frame = [bg frame];
            [frame setHeight: buttonDimensions.totalHeight];
            [frame setWidth: buttonDimensions.totalWidth];
            frame.x = 0;
            frame.y = 0;

            currentLayer.frame().x = buttonDimensions.offsetLeft;
            currentLayer.frame().y = buttonDimensions.offsetTop;
        }

        // re-select the previous selected layers
        for (var i = 0; i < [selection count]; i++) {
            var currentLayer = [selection objectAtIndex: i];
            currentLayer.setIsSelected(true);
        }

        saveData(context, dataKey, inputPaddingsStr);
    }
};