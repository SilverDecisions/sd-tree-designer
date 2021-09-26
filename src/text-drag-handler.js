import {AppUtils} from './app-utils'
import * as d3 from './d3'
import {ContextMenu} from './context-menu/context-menu'

export class TextDragHandler{

    treeDesigner;
    data;
    config;

    drag;


    constructor(treeDesigner, data){
        this.treeDesigner = treeDesigner;
        this.data = data;

        var self = this;
        this.drag = d3.drag()
            .subject(function(event, d) {
                if(d==null){
                    return  {
                        x: event.x,
                        y: event.y
                    };
                }
                var t = d3.select(this);
                return {
                    x: t.attr("x") + AppUtils.getTranslation(t.attr("transform"))[0],
                    y: t.attr("y") + AppUtils.getTranslation(t.attr("transform"))[1]
                };
            })
            .on("start", function(event, d){
                self.dragStarted.call(this, event, d, self)
            })
            .on("drag", function (event, d) {
                self.onDrag.call(this, event, d, self);
            })
            .on("end", function (event, d) {
                self.dragEnded.call(this, event, d, self);
            })
    }


    dragStarted(event, d,self) {
        // self.treeDesigner.layout.disableAutoLayout();
        ContextMenu.hide();
        var text = d3.select(this);
        if(!text.classed("selected")){
            self.treeDesigner.clearSelection();
        }

        self.treeDesigner.selectText(d);
        text.classed("selected dragging", true);
        self.selectedNodes = self.treeDesigner.getSelectedNodes();
        self.prevDragEvent = event;
        self.dragEventCount = 0;
    }

    onDrag(event, draggedText, self){
        if(self.dragEventCount==2){
            self.data.saveState();
        }
        self.dragEventCount++;

        var dx = event.x - self.prevDragEvent.x;
        var dy = event.y- self.prevDragEvent.y;

        self.treeDesigner.layout.moveTexts([draggedText], dx, dy);

        self.prevDragEvent = event;
        self.treeDesigner.updatePlottingRegionSize();
    }

    dragEnded(event, draggedNode, self){
         d3.select(this).classed("dragging", false);
    }

}


