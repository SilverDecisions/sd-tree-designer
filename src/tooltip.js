import * as d3 from './d3'
import {Utils} from 'sd-utils'

export class Tooltip {
    static getContainer(){
        return d3.select("body").selectOrAppend('div.sd-tooltip');
    }

    static show(html, xOffset = 5, yOffset = 28, event, duration=null) {
        var container = Tooltip.getContainer()
            .style("opacity", 0);
        container.transition()
            .duration(200)
            .style("opacity", .98);
        container.html(html);
        Tooltip.updatePosition(xOffset, yOffset, event);
        if(duration){
            setTimeout(function(){
                Tooltip.hide();
            }, duration)
        }
    }

    static updatePosition(xOffset = 5, yOffset = 28, event) {
        event = event || d3.event;
        Tooltip.getContainer()
            .style("left", (event.pageX + xOffset) + "px")
            .style("top", (event.pageY - yOffset) + "px");
    }

    static hide(duration = 500) {
        var t = Tooltip.getContainer();
        if(duration){
            t = t.transition().duration(duration)
        }
        t.style("opacity", 0);
    }

    static attach(target, htmlOrFn, xOffset, yOffset) {
        target.on('mouseover', function (d, i) {
            var html = null;
            if (Utils.isFunction(htmlOrFn)) {
                html = htmlOrFn(d, i);
            } else {
                html = htmlOrFn;
            }

            if (html !== null && html !== undefined && html !== '') {
                Tooltip.show(html, xOffset, yOffset);
            }else{
                Tooltip.hide(0);
            }

        }).on('mousemove', function (d) {
            Tooltip.updatePosition(xOffset, yOffset);
        }).on("mouseout", function (d) {
            Tooltip.hide();
        });
    }
}
