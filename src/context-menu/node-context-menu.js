import {ContextMenu} from './context-menu'
import {domain as model} from 'sd-model'
import {i18n} from "../i18n/i18n";

export class NodeContextMenu extends ContextMenu {
    treeDesigner;

    constructor(treeDesigner, operationsForObject) {
        var menu = function (d) {

            var copyMenuItem = {
                title: i18n.t('contextMenu.node.copy'),
                action: function (elm, d, i) {
                    treeDesigner.selectNode(d, !treeDesigner.isNodeSelected(d));
                    treeDesigner.copySelectedNodes();
                }
            };
            var cutMenuItem = {
                title: i18n.t('contextMenu.node.cut'),
                action: function (elm, d, i) {
                    treeDesigner.selectNode(d, !treeDesigner.isNodeSelected(d));
                    treeDesigner.cutSelectedNodes();
                }
            };
            var pasteMenuItem = {
                title: i18n.t('contextMenu.node.paste'),
                action: function (elm, d, i) {
                    treeDesigner.pasteToNode(d);
                },
                disabled: d.folded || !treeDesigner.copiedNodes || !treeDesigner.copiedNodes.length

            };
            var deleteMenuItem = {
                title: i18n.t('contextMenu.node.delete'),
                action: function (elm, d, i) {

                    treeDesigner.selectNode(d, !treeDesigner.isNodeSelected(d));
                    treeDesigner.removeSelectedNodes();

                }
            };

            var menu = [];
            if (d.type == model.TerminalNode.$TYPE) {
                menu = [copyMenuItem, cutMenuItem, deleteMenuItem];
                NodeContextMenu.addNodeConversionOptions(d, menu, treeDesigner);
                return menu;
            }

            if(!d.folded){
                menu.push({
                    title: i18n.t('contextMenu.node.addDecisionNode'),
                    action: function (elm, d) {
                        treeDesigner.addDecisionNode(d)
                    }
                });
                menu.push({
                    title: i18n.t('contextMenu.node.addChanceNode'),
                    action: function (elm, d) {
                        treeDesigner.addChanceNode(d)
                    }
                });
                menu.push({
                    title: i18n.t('contextMenu.node.addTerminalNode'),
                    action: function (elm, d) {
                        treeDesigner.addTerminalNode(d)
                    }
                });
                menu.push({divider: true});
            }

            menu.push(copyMenuItem);
            menu.push(cutMenuItem);
            menu.push(pasteMenuItem);
            menu.push(deleteMenuItem);

            NodeContextMenu.addNodeConversionOptions(d, menu, treeDesigner);
            menu.push({divider: true});
            menu.push({
                title: i18n.t('contextMenu.node.selectSubtree'),
                action: function (elm, d) {
                    treeDesigner.selectSubTree(d, true);
                }
            });

            if(!d.folded){
                menu.push({
                    title: i18n.t('contextMenu.node.fold'),
                    action: function (elm, d) {
                        treeDesigner.foldSubtree(d);
                    }
                });
            }else{
                menu.push({
                    title: i18n.t('contextMenu.node.unfold'),
                    action: function (elm, d) {
                        treeDesigner.foldSubtree(d, false);
                    }
                });
            }

            if(operationsForObject){
                var operations = operationsForObject(d);
                if(operations.length) {
                    menu.push({divider: true});
                    operations.forEach(op=>{
                        menu.push({
                            title: i18n.t('contextMenu.node.'+op.name),
                            action: function (elm, d) {
                                treeDesigner.performOperation(d, op);
                            },
                            disabled: !op.canPerform(d)
                        });
                    })
                }
            }

            return menu;
        };

        super(menu);
        this.treeDesigner = treeDesigner;
    }

    static addNodeConversionOptions(d, menu, treeDesigner){
        var conversionOptions = NodeContextMenu.getNodeConversionOptions(d, treeDesigner);
        if(conversionOptions.length){
            menu.push({divider: true});
            conversionOptions.forEach(o=>menu.push(o));

        }
    }

    static getNodeConversionOptions(d, treeDesigner){
        var options = [];

        if(d.folded){
            return [];
        }

        var allAllowedTypes = [model.DecisionNode.$TYPE, model.ChanceNode.$TYPE, model.TerminalNode.$TYPE];

        if(!d.childEdges.length && d.$parent){
            allAllowedTypes.filter(t=>t!==d.type).forEach(type=>{
                options.push(NodeContextMenu.getNodeConversionOption(type, treeDesigner))
            })
        }else{
            if(d instanceof model.DecisionNode){
                options.push(NodeContextMenu.getNodeConversionOption(model.ChanceNode.$TYPE, treeDesigner))
            }else{
                options.push(NodeContextMenu.getNodeConversionOption(model.DecisionNode.$TYPE, treeDesigner))
            }
        }
        return options;
    }

    static getNodeConversionOption(typeToConvertTo, treeDesigner){
        return {
            title: i18n.t('contextMenu.node.convert.'+typeToConvertTo),
            action: function (elm, d) {
                treeDesigner.convertNode(d, typeToConvertTo);
            },
        }
    }
}
