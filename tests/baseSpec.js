const file = require('../index');
const fs = require('fs');
const diagrams = require('./diagrams');

function runGraph() {
    const data = file.readFile();
    const processedData = file.preprocess(data);
    return file.buildGraph(data, processedData);
}

describe('Base Spec', () => {
    describe('Base Cases', () => {
        describe('Start-End Case', () => {
            beforeEach(() => {
                spyOn(fs, 'readFileSync').and.returnValue(JSON.stringify(diagrams['start-end']));
            });
            it('should return all the nodes', () => {
                expect(runGraph()).toEqual([{from: 0, to: 1, fromType: 'Start', fromName: 'Start', toType: 'End', toName: 'End'}]);
            });
        });
        describe('No Human Tasks', () => {
            beforeEach(() => {
                spyOn(fs, 'readFileSync').and.returnValue(JSON.stringify(diagrams['no-human']));
            });
            it('should return all the nodes', () => {
                expect(runGraph()).toEqual([{from: 0, to: 3, fromType: 'Start', fromName: 'Start', toType: 'End', toName: 'End'}]);
            });
        });
        describe('No Service Tasks', () => {
            beforeEach(() => {
                spyOn(fs, 'readFileSync').and.returnValue(JSON.stringify(diagrams['no-service']));
            });
            it('should return all the nodes', () => {
                expect(runGraph()).toEqual([
                    {
                        "from": 0,
                        "to": 1,
                        "fromType": "Start",
                        "fromName": "Start",
                        "toType": "HumanTask",
                        "toName": "A"
                    },
                    {
                        "from": 1,
                        "to": 2,
                        "fromType": "HumanTask",
                        "fromName": "A",
                        "toType": "HumanTask",
                        "toName": "B"
                    },
                    {
                        "from": 2,
                        "to": 3,
                        "fromType": "HumanTask",
                        "fromName": "B",
                        "toType": "End",
                        "toName": "End"
                    }
                ]);
            });
        });
        describe('One Gateway', () => {
            beforeEach(() => {
                spyOn(fs, 'readFileSync').and.returnValue(JSON.stringify(diagrams['one-gateway']));
            });
            it('should return all the nodes', () => {
                expect(runGraph()).toEqual([
                    {
                        "from": 0,
                        "to": 1,
                        "fromType": "Start",
                        "fromName": "Start",
                        "toType": "HumanTask",
                        "toName": "A"
                    },
                    {
                        "from": 1,
                        "to": 4,
                        "fromType": "HumanTask",
                        "fromName": "A",
                        "toType": "End",
                        "toName": "End"
                    }
                ]);
            });
        });
        describe('No Gateways', () => {
            beforeEach(() => {
                spyOn(fs, 'readFileSync').and.returnValue(JSON.stringify(diagrams['no-gateway']));
            });
            it('should return all the nodes', () => {
                expect(runGraph()).toEqual([
                    {
                        "from": 0,
                        "to": 1,
                        "fromType": "Start",
                        "fromName": "Start",
                        "toType": "HumanTask",
                        "toName": "A"
                    },
                    {
                        "from": 1,
                        "to": 3,
                        "fromType": "HumanTask",
                        "fromName": "A",
                        "toType": "HumanTask",
                        "toName": "B"
                    },
                    {
                        "from": 3,
                        "to": 5,
                        "fromType": "HumanTask",
                        "fromName": "B",
                        "toType": "HumanTask",
                        "toName": "B"
                    },
                    {
                        "from": 5,
                        "to": 6,
                        "fromType": "HumanTask",
                        "fromName": "B",
                        "toType": "End",
                        "toName": "End"
                    }
                ]);
            });
        });
    });
    describe('More Complicated', () => {
        describe('Serveral Gateways', () => {
            beforeEach(() => {
                spyOn(fs, 'readFileSync').and.returnValue(JSON.stringify(diagrams['complicated']));
            });
            it('should return all the nodes', () => {
                expect(runGraph()).toEqual([
                    {
                        "from": 0,
                        "to": 1,
                        "fromType": "Start",
                        "fromName": "Start",
                        "toType": "HumanTask",
                        "toName": "A"
                    },
                    {
                        "from": 1,
                        "to": [
                            4,
                            5
                        ],
                        "fromType": "HumanTask",
                        "fromName": "A",
                        "toType": [
                            "HumanTask",
                            "HumanTask"
                        ],
                        "toName": [
                            "D",
                            "C"
                        ]
                    },
                    {
                        "from": 4,
                        "to": 8,
                        "fromType": "HumanTask",
                        "fromName": "D",
                        "toType": "End",
                        "toName": "End"
                    },
                    {
                        "from": 5,
                        "to": 8,
                        "fromType": "HumanTask",
                        "fromName": "C",
                        "toType": "End",
                        "toName": "End"
                    }
                ]);
            });
        });
    });
});