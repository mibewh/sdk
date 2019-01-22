/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// You can delete this file if you're not using it
const path = require("path");

const Gitana = require("gitana");

const {
  introspectSchema,
  buildSchema,
  print,
  printSchema
} = require(`graphql`);

const {
  promisify
} = require("util");

const crypto = require("crypto");

const uuidv4 = require("uuid/v4");

const {
  makeRemoteExecutableSchema,
  transformSchema,
  // introspectSchema,
  RenameTypes
} = require(`graphql-tools`);

const {
  NamespaceUnderFieldTransform,
  StripNonQueryTransform
} = require(`./transforms`);

exports.sourceNodes = ({
  actions,
  createNodeId,
  cache,
  store
}, options, callback) => {
  console.log("yeet");
  const {
    addThirdPartySchema,
    createPageDependency,
    createNode
  } = actions;
  const {
    clientKey,
    clientSecret,
    username,
    password,
    baseURL // repositoryId,
    // branchId

  } = options;
  Gitana.connect({
    "clientKey": "e34de2c1-f4f7-43a6-93c4-efa23d105fea",
    "clientSecret": "IoLE0ldateSW2gdmOJO0bgiMEeBbMbkeCjSvhm98FbeUYyJwn1dLlzsNPVOwF+PgJ0WCvfF0JkO1yGwzTALu51vOHYHY48cehH3K/NOVOUI=",
    "username": "dac1fbfe-1265-4881-954b-782f296076c2",
    "password": "Oy/XF8OIBxH9QjfRYHC2G3ZTV9MSUvjA3yU+haVLBKhnzvaHeIHSMeiYh++y3mPr9PciFwaR+B6u0yWQTk/arKsxl+HlbuDl8Y7LmoaZ6us=",
    "baseURL": "http://localhost:8080",
    "application": "f72237d7737ec3e70e3d"
  }, function (err) {
    var repositoryId = "2e746f5ff87eb5b3508d";
    var branchId = "d107851fe8c4d19a99de";
    const platform = this.platform();
    platform.readRepository(repositoryId).then(function () {
      this.readBranch(branchId).then(function () {
        const branch = this;
        branch.graphqlSchema(function (sdl) {
          // Graphql stuff
          // Copied from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-graphql/src/gatsby-node.js
          var introspectionSchema = buildSchema(sdl);

          const fetcher = async ({
            query: queryDocument,
            variables,
            operationName,
            context
          }) => {
            const query = print(queryDocument);
            return Chain(branch).graphqlQuery(query, operationName, variables, function (response) {//     var deepSearch = function(item) {
              //         if (Array.isArray(item))
              //         {
              //             item.forEach(function(child) {
              //                 deepSearch(child);
              //             });
              //         }
              //         else if (typeof item === "object")
              //         {
              //             Object.keys(item).forEach(function(key) {
              //                 if (key === "_attachments")
              //                 {
              //                     item["_attachments"].forEach(function(attachment)
              //                     {
              //                         if (attachment["uri"] !== null)
              //                         {
              //                             const uri = attachment["uri"];
              //                             const url = "http://localhost:8080" + uri;
              //                             const auth = platform.getDriver().getHttpHeaders()["Authorization"];
              //                             var loaded = false;
              //                             var fileNode = createRemoteFileNode ({
              //                                 url,
              //                                 store,
              //                                 cache,
              //                                 createNode,
              //                                 createNodeId,
              //                                 auth
              //                             }).then(function(fileNode) {
              //                                 // This is not getting done before the return...
              //                                 attachment.path = fileNode.relativePath;
              //                             });
              //                         }
              //                     });
              //                 }
              //                 else {
              //                     deepSearch(item[key]);
              //                 }
              //             });
              //         }
              //     };
              //     deepSearch(response);
              //     return response;
            });
          };

          const remoteSchema = makeRemoteExecutableSchema({
            schema: introspectionSchema,
            fetcher
          });
          const nodeId = createNodeId(`cloudcms-CLOUDCMS`);
          const node = createSchemaNode({
            id: nodeId
          });
          createNode(node);

          const resolver = (parent, args, context) => {
            createPageDependency({
              path: context.path,
              nodeId: nodeId
            });
            return {};
          };

          const schema = transformSchema(remoteSchema, [new StripNonQueryTransform(), new RenameTypes(name => `CLOUDCMS_${name}`), new NamespaceUnderFieldTransform({
            typeName: 'CLOUDCMS',
            fieldName: 'cloudcms',
            resolver
          })]);
          addThirdPartySchema({
            schema: schema
          });
          callback();
        });
      });
    });
  });
};

function createSchemaNode({
  id
}) {
  const nodeContent = uuidv4();
  const nodeContentDigest = crypto.createHash(`md5`).update(nodeContent).digest(`hex`);
  return {
    id,
    typeName: 'CLOUDCMS',
    fieldName: 'cloudcms',
    parent: null,
    children: [],
    internal: {
      type: `GraphQLSource`,
      contentDigest: nodeContentDigest,
      ignoreType: true
    }
  };
}