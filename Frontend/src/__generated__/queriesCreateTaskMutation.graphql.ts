/**
 * @generated SignedSource<<76bff6ca329784bb41e539f624680ea2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TaskRequestInput = {
  description?: string | null | undefined;
  title: string;
};
export type queriesCreateTaskMutation$variables = {
  request: TaskRequestInput;
};
export type queriesCreateTaskMutation$data = {
  readonly createTask: {
    readonly description: string | null | undefined;
    readonly id: any;
    readonly status: string | null | undefined;
    readonly title: string;
  };
};
export type queriesCreateTaskMutation = {
  response: queriesCreateTaskMutation$data;
  variables: queriesCreateTaskMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "request"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "request",
        "variableName": "request"
      }
    ],
    "concreteType": "TaskResponse",
    "kind": "LinkedField",
    "name": "createTask",
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
    "name": "queriesCreateTaskMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "queriesCreateTaskMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "45d8486956494d60a123b3c44630f659",
    "id": null,
    "metadata": {},
    "name": "queriesCreateTaskMutation",
    "operationKind": "mutation",
    "text": "mutation queriesCreateTaskMutation(\n  $request: TaskRequestInput!\n) {\n  createTask(request: $request) {\n    id\n    title\n    description\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "106641678fa8854ef10deabb8968a54c";

export default node;
