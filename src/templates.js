import {Utils} from "sd-utils";
import {i18n} from './i18n/i18n'

export class Templates{

    static growl = require('./templates/growl_message.html');

    static get(templateName, variables){
        var compiled = Utils.template(Templates[templateName],{ 'imports': { 'i18n': i18n, 'Templates': Templates, 'include': function(n, v) {return Templates.get(n, v)} } });
        if(variables){
            variables.variables = variables;
        }else{
            variables = {variables:{}}
        }
        return compiled(variables)

    }

    static styleRule(selector, props){
        var s = selector+ '{';
        props.forEach(p=> s+=Templates.styleProp(p[0], p[1]));
        s+='} ';
        return s;
    }
    static styleProp(styleName, variableName){
        return  styleName+': <%= '+variableName+' %>; '
    }

    static treeDesignerSelector = 'svg.sd-tree-designer';
    static nodeSelector(type, clazz){
        var s = Templates.treeDesignerSelector+' .node';
        if(type){
            s+='.'+type+'-node';
        }
        if(clazz){
            s+='.'+clazz;
        }
        return s;
    }
    static edgeSelector(clazz){
        var s = Templates.treeDesignerSelector+' .edge';
        if(clazz){
            s+='.'+clazz;
        }
        return s;
    }

    static treeDesignerStyles =

        Templates.styleRule(Templates.treeDesignerSelector,[
            ['font-size', 'fontSize'],
            ['font-family', 'fontFamily'],
            ['font-weight', 'fontWeight'],
            ['font-style', 'fontStyle']
        ])+
        //   node
        Templates.styleRule(Templates.nodeSelector()+' path',[
            ['fill', 'node.fill'],
            ['stroke-width', 'node.strokeWidth']
        ])+
        Templates.styleRule(Templates.nodeSelector('decision', 'optimal')+' path, '+Templates.nodeSelector('chance', 'optimal')+' path,' +Templates.nodeSelector('terminal', 'optimal')+' path',[
            ['stroke', 'node.optimal.stroke'],
            ['stroke-width', 'node.optimal.strokeWidth']
        ])+
        Templates.styleRule(Templates.nodeSelector()+' .label',[
            ['font-size', 'node.label.fontSize'],
            ['fill', 'node.label.color']
        ])+
        Templates.styleRule(Templates.nodeSelector()+' .payoff',[
            ['font-size', 'node.payoff.fontSize'],
            ['fill', 'node.payoff.color'],
        ])+
        Templates.styleRule(Templates.nodeSelector()+' .payoff.negative',[
            ['fill', 'node.payoff.negativeColor'],
        ])+

        //    decision node
        Templates.styleRule(Templates.nodeSelector('decision')+' path',[
            ['fill', 'node.decision.fill'],
            ['stroke', 'node.decision.stroke']
        ])+
        Templates.styleRule(Templates.nodeSelector('decision', 'selected')+' path',[
            ['fill', 'node.decision.selected.fill']
        ])+

        //    chance node
        Templates.styleRule(Templates.nodeSelector('chance')+' path',[
            ['fill', 'node.chance.fill'],
            ['stroke', 'node.chance.stroke']
        ])+
        Templates.styleRule(Templates.nodeSelector('chance', 'selected')+' path',[
            ['fill', 'node.chance.selected.fill']
        ])+

        //    terminal node
        Templates.styleRule(Templates.nodeSelector('terminal')+' path',[
            ['fill', 'node.terminal.fill'],
            ['stroke', 'node.terminal.stroke']
        ])+
        Templates.styleRule(Templates.nodeSelector('terminal', 'selected')+' path',[
            ['fill', 'node.terminal.selected.fill']
        ])+
        Templates.styleRule(Templates.nodeSelector('terminal')+' .aggregated-payoff',[
            ['font-size', 'node.terminal.payoff.fontSize'],
            ['fill', 'node.terminal.payoff.color'],
        ])+
        Templates.styleRule(Templates.nodeSelector('terminal')+' .aggregated-payoff.negative',[
            ['fill', 'node.terminal.payoff.negativeColor'],
        ])+


        //probability
        Templates.styleRule(Templates.treeDesignerSelector+' .node .probability-to-enter, '+Templates.treeDesignerSelector+' .edge .probability',[
            ['font-size', 'probability.fontSize'],
            ['fill', 'probability.color']
        ])+

        //edge
        Templates.styleRule(Templates.edgeSelector()+' path',[
            ['stroke', 'edge.stroke'],
            ['stroke-width', 'edge.strokeWidth']
        ])+
        Templates.styleRule(Templates.treeDesignerSelector+' marker#arrow path',[
            ['fill', 'edge.stroke'],
        ])+
        Templates.styleRule(Templates.edgeSelector('optimal')+' path',[
            ['stroke', 'edge.optimal.stroke'],
            ['stroke-width', 'edge.optimal.strokeWidth']
        ])+
        Templates.styleRule(Templates.treeDesignerSelector+' marker#arrow-optimal path',[
            ['fill', 'edge.optimal.stroke'],
        ])+

        Templates.styleRule(Templates.edgeSelector('selected')+' path',[
            ['stroke', 'edge.selected.stroke'],
            ['stroke-width', 'edge.selected.strokeWidth']
        ])+
        Templates.styleRule(Templates.treeDesignerSelector+' marker#arrow-selected path',[
            ['fill', 'edge.selected.stroke'],
        ])+

        Templates.styleRule(Templates.edgeSelector()+' .label',[
            ['font-size', 'edge.label.fontSize'],
            ['fill', 'edge.label.color']
        ])+

        Templates.styleRule(Templates.edgeSelector()+' .payoff',[
            ['font-size', 'edge.payoff.fontSize'],
            ['fill', 'edge.payoff.color'],
        ])+
        Templates.styleRule(Templates.edgeSelector()+' .payoff.negative',[
            ['fill', 'edge.payoff.negativeColor'],
        ])+

        Templates.styleRule(Templates.treeDesignerSelector+' .sd-title-container text.sd-title',[
            ['font-size', 'title.fontSize'],
            ['font-weight', 'title.fontWeight'],
            ['font-style', 'title.fontStyle'],
            ['fill', 'title.color']
        ]) +
        Templates.styleRule(Templates.treeDesignerSelector+' .sd-title-container text.sd-description',[
            ['font-size', 'description.fontSize'],
            ['font-weight', 'description.fontWeight'],
            ['font-style', 'description.fontStyle'],
            ['fill', 'description.color']
        ])
}




