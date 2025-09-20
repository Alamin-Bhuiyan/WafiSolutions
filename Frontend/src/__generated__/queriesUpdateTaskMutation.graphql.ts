/**
 * @generated SignedSource<<2697fdc732ff556cd88db23cfa9f3280>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type Status = "COMPLETED" | "PENDING" | "%future added value";
export type queriesUpdateTaskMutation$variables = {
  id: any;
  status: Status;
};
export type queriesUpdateTaskMutation$data = {
  readonly updateTask: {
    readonly description: string | null | undefined;
    readonly id: any;
    readonly status: string | null | undefined;
    readonly title: string;
  };
};
export type queriesUpdateTaskMutation = {
  response: queriesUpdateTaskMutation$data;
  variables: queriesUpdateTaskMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "status"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "status",
        "variableName": "status"
      }
    ],
    "concreteType": "TaskResponse",
    "kind": "LinkedField",
    "name": "updateTask",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "queriesUpdateTaskMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "queriesUpdateTaskMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "873fb85a444296e2ec67cf63056a8767",
    "id": null,
    "metadata": {},
    "name": "queriesUpdateTaskMutation",
    "operationKind": "mutation",
    "text": "mutation queriesUpdateTaskMutation(\n  $id: UUID!\n  $status: Status!\n) {\n  updateTask(id: $id, status: $status) {\n    id\n    title\n    description\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "0a7a65246a54a76d93ba0f5929b20a3b";

export default node;
