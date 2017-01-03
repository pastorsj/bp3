module.exports = {
    "start-end": {
        "nodes": [
            {
                "id": 0,
                "name": "Start",
                "type": "Start"
            },
            {
                "id": 1,
                "name": "End",
                "type": "End"
            }
        ],
        "edges": [
            {
                "from": 0,
                "to": 1
            }
        ]
    },
    "no-human": {
        "nodes": [
            {
                "id": 0,
                "name": "Start",
                "type": "Start"
            },
            {
                "id": 1,
                "name": "A",
                "type": "ServiceTask"
            },
            {
                "id": 2,
                "name": "B",
                "type": "ServiceTask"
            },
            {
                "id": 3,
                "name": "End",
                "type": "End"
            }
        ],
        "edges": [
            {
                "from": 0,
                "to": 1
            },
            {
                "from": 1,
                "to": 2
            },
            {
                "from": 2,
                "to": 3
            }
        ]
    },
    "no-service": {
        "nodes": [
            {
                "id": 0,
                "name": "Start",
                "type": "Start"
            },
            {
                "id": 1,
                "name": "A",
                "type": "HumanTask"
            },
            {
                "id": 2,
                "name": "B",
                "type": "HumanTask"
            },
            {
                "id": 3,
                "name": "End",
                "type": "End"
            }
        ],
        "edges": [
            {
                "from": 0,
                "to": 1
            },
            {
                "from": 1,
                "to": 2
            },
            {
                "from": 2,
                "to": 3
            }
        ]
    },
    "one-gateway": {
        "nodes": [
            {
                "id": 0,
                "name": "Start",
                "type": "Start"
            },
            {
                "id": 1,
                "name": "A",
                "type": "HumanTask"
            },
            {
                "id": 2,
                "name": "B",
                "type": "ServiceTask"
            },
            {
                "id": 3,
                "name": "G1",
                "type": "Gateway"
            },
            {
                "id": 4,
                "name": "End",
                "type": "End"
            }
        ],
        "edges": [
            {
                "from": 0,
                "to": 1
            },
            {
                "from": 1,
                "to": 3
            },
            {
                "from": 3,
                "to": 2
            },
            {
                "from": 2,
                "to": 4
            }
        ]
    },
    "no-gateway": {
        "nodes": [
            {
                "id": 0,
                "name": "Start",
                "type": "Start"
            },
            {
                "id": 1,
                "name": "A",
                "type": "HumanTask"
            },
            {
                "id": 2,
                "name": "B",
                "type": "ServiceTask"
            },
            {
                "id": 3,
                "name": "B",
                "type": "HumanTask"
            },
            {
                "id": 4,
                "name": "B",
                "type": "ServiceTask"
            },
            {
                "id": 5,
                "name": "B",
                "type": "HumanTask"
            },
            {
                "id": 6,
                "name": "End",
                "type": "End"
            }
        ],
        "edges": [
            {
                "from": 0,
                "to": 1
            },
            {
                "from": 1,
                "to": 2
            },
            {
                "from": 2,
                "to": 3
            },
            {
                "from": 3,
                "to": 4
            },
            {
                "from": 4,
                "to": 5
            },
            {
                "from": 5,
                "to": 6
            }
        ]
    },
    "complicated": {
        "nodes": [
            {
                "id": 0,
                "name": "Start",
                "type": "Start"
            },
            {
                "id": 1,
                "name": "A",
                "type": "HumanTask"
            },
            {
                "id": 2,
                "name": "B",
                "type": "ServiceTask"
            },
            {
                "id": 3,
                "name": "G1",
                "type": "Gateway"
            },
            {
                "id": 4,
                "name": "D",
                "type": "HumanTask"
            },
            {
                "id": 5,
                "name": "C",
                "type": "HumanTask"
            },
            {
                "id": 6,
                "name": "G2",
                "type": "Gateway"
            },
            {
                "id": 7,
                "name": "E",
                "type": "ServiceTask"
            },
            {
                "id": 8,
                "name": "End",
                "type": "End"
            }
        ],
        "edges": [
            {
                "from": 0,
                "to": 1
            },
            {
                "from": 1,
                "to": 2
            },
            {
                "from": 2,
                "to": 3
            },
            {
                "from": 3,
                "to": 4
            },
            {
                "from": 4,
                "to": 6
            },
            {
                "from": 3,
                "to": 5
            },
            {
                "from": 5,
                "to": 6
            },
            {
                "from": 6,
                "to": 7
            },
            {
                "from": 7,
                "to": 8
            }
        ]
    }
}