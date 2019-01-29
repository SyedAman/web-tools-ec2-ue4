// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTask = `query GetTask($id: ID!) {
  getTask(id: $id) {
    id
    type
    status
    datasetWorld
    datasetPreset
    mlModel
    trainingAlgorithm
    startedOn
    endedOn
  }
}
`;
export const listTasks = `query ListTasks(
  $filter: ModelTaskFilterInput
  $limit: Int
  $nextToken: String
) {
  listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      type
      status
      datasetWorld
      datasetPreset
      mlModel
      trainingAlgorithm
      startedOn
      endedOn
    }
    nextToken
  }
}
`;
