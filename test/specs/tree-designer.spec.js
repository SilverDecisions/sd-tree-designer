import {TreeDesigner} from '../../src/tree-designer'
import {DataModel} from "sd-model";

describe("TreeDesigner", () => {



    let fixtures = jasmine.getFixtures();

    fixtures.fixturesPath = "base/test/";
    let fileList = JSON.parse(readFixtures("data-json-filelist.json"));
    let json = JSON.parse(readFixtures("trees/rockefellerWithParamsNoRandom.json")).data;
    let data;
    let treeDesigner;
    beforeEach(function() {

    });

    let containerId = 'container';
    let container;
    let app;

    beforeEach(function() {
        container = document.createElement("div");
        container.id = containerId;
        document.getElementsByTagName('body')[0].appendChild(container);

        data = new DataModel(json);
        treeDesigner = new TreeDesigner(containerId,  data)

    });

    it("should be initialized", function() {

        expect(treeDesigner).toBeTruthy();
        expect(document.getElementsByClassName('sd-tree-designer')).toBeTruthy();

    });

    it("should have 3 decision nodes", function(){
        expect(document.getElementsByClassName("decision-node").length).toEqual(3)

    });

    it("should have 4 chance nodes", function(){
        expect(document.getElementsByClassName("chance-node").length).toEqual(4)
    });

    it("should have 9 terminal nodes", function(){
        expect(document.getElementsByClassName("terminal-node").length).toEqual(9)
    })

    it("should redraw without errors", function() {
        expect(()=>treeDesigner.redraw()).not.toThrow();
    });

    it("should add decision node", function() {
        treeDesigner.addDecisionNode(data.getRoots()[0]);
        expect(document.getElementsByClassName("decision-node").length).toEqual(4)
    });

    it("should add chance node", function() {
        treeDesigner.addChanceNode(data.getRoots()[0]);
        expect(document.getElementsByClassName("chance-node").length).toEqual(5)
    });

    it("should add terminal node", function() {
        treeDesigner.addTerminalNode(data.getRoots()[0]);
        expect(document.getElementsByClassName("terminal-node").length).toEqual(10)
    });

    it("should draw manual layout", function() {
        expect(()=>treeDesigner.layout.disableAutoLayout()).not.toThrow();
        expect(()=>treeDesigner.layout.update()).not.toThrow();
        treeDesigner.addDecisionNode(data.getRoots()[0]);
        expect(()=>treeDesigner.layout.update()).not.toThrow();
    });

    it("should return selection", function() {
        expect(()=>treeDesigner.getSelectedNodes()).not.toThrow();

    });

    it("should clear selection", function() {
        expect(()=>treeDesigner.clearSelection()).not.toThrow();

    });

    it("should select node", function() {
        expect(()=>treeDesigner.selectNode(data.getRoots()[0])).not.toThrow();

    });
});

