/**
 * @generated SignedSource<<6244c428d58f7299af4695f543c3554a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type queriesGetTasksQuery$variables = Record<PropertyKey, never>;
export type queriesGetTasksQuery$data = {
  readonly taskList: ReadonlyArray<{
    readonly description: string | null | undefined;
    readonly id: any;
    readonly status: string | null | undefined;
    readonly title: string;
  }>;
};
export type queriesGetTasksQuery = {
  response: queriesGetTasksQuery$data;
  variables: queriesGetTasksQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "TaskResponse",
    "kind": "LinkedField",
    "name": "taskList",
    "plural": true,
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "queriesGetTasksQuery",
    "selections": (v0/*: any*/),
    "type": "GetTasksQuery",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "queriesGetTasksQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "9e651f4bc8d58ec9684c9947b30ea4e8",
    "id": null,
    "metadata": {},
    "name": "queriesGetTasksQuery",
    "operationKind": "query",
    "text": "query queriesGetTasksQuery {\n  taskList {\n    id\n    title\n    description\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "48705cff617dfdc6b04104903f2e22e7";

export default node;
