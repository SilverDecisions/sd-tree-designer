import {AppUtils} from './app-utils'
import * as d3 from './d3'
import {ContextMenu} from './context-menu/context-menu'

export class NodeDragHandler{

    treeDesigner;
    data;
    config;

    drag;
    stateSnapshot = null;


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


    dragStarted(event, d, self) {
        if(self.ignoreDrag){
            self.ignoreDrag=false;
            self.ignoredDrag=true;
            return;
        }
        self.ignoredDrag=false;
        self.stateSnapshot = self.data.createStateSnapshot();

        // self.treeDesigner.layout.disableAutoLayout();
        ContextMenu.hide();
        var node = d3.select(this);
        if(!node.classed("selected")){
            self.treeDesigner.clearSelection();
        }

        self.treeDesigner.selectNode(d);
        node.classed("selected dragging", true);
        self.selectedNodes = self.treeDesigner.getSelectedNodes(true);
        self.prevDragEvent = event;
        self.dragEventCount = 0;
    }

    onDrag(event, draggedNode, self){
        if(self.ignoredDrag){
            return;
        }

        if(self.dragEventCount===2 && self.stateSnapshot){
            self.data.saveStateFromSnapshot(self.stateSnapshot); // TODO save only if something has really changed
            self.stateSnapshot = null;
        }
        self.dragEventCount++;
        if(self.selectedNodes.length>5 && self.dragEventCount%2!==1){
            return;
        }

        var dx = event.x - self.prevDragEvent.x;
        var dy = event.y- self.prevDragEvent.y;
        self.treeDesigner.layout.moveNodes(self.selectedNodes, dx, dy, draggedNode);


        self.prevDragEvent = event;
        self.treeDesigner.redrawEdges();
        self.treeDesigner.updatePlottingRegionSize();
    }

    dragEnded(event, draggedNode, self){
        var node = d3.select(this).classed("dragging", false);
        if(self.ignoredDrag){
            return;
        }
        self.treeDesigner.layout.update(draggedNode)
    }

    cancelDrag(){
        this.ignoreDrag = true;
    }

}


