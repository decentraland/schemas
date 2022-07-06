const ajv_keywords = require('ajv-keywords');
const ajv_errors = require('ajv-errors');
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const {Profile, Scene, Store, Wearable } = require('./dist');

const standaloneCode = require("ajv/dist/standalone").default

const ajv = new Ajv({ schemas: [
    // Profile.schema,
    Scene.schema,
    // Store.schema,
    // Wearable.schema
  ],$data: true, allErrors: true, code: {source: true}})
ajv_keywords(ajv)
ajv_errors(ajv, { singleError: true })
let moduleCode = standaloneCode(ajv)

// Now you can write the module code to file
fs.writeFileSync(path.join(__dirname, "./dist/validate-cjs.js"), moduleCode)
