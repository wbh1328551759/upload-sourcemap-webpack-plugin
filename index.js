#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const FormData = require('form-data');

class UploadSourceMapPlugin {
  constructor({targetUrl, buildPath}) {
    this.targetUrl = targetUrl
    this.buildPath = buildPath
  }

  uploadFiles = async (files) => {
    let formData = new FormData();
    files.forEach(file => {
      formData.append('file',fs.createReadStream(file.path), file.name);
    })
    await axios.post(this.targetUrl, formData,{
      headers:{
        ...formData.getHeaders()
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    })
  }

  async apply(compiler) {
    compiler.hooks.afterEmit.tap('UploadSourceMapPlugin', async (compilation) => {
      const outputFileNames = fs.readdirSync(this.buildPath)

      const mapFiles = outputFileNames.filter(fileName => fileName.includes('.js.map'))
        .map(fileName => ({
          path: path.join(this.buildPath, fileName),
          name: fileName
        }))

      if (mapFiles.length > 0) {
        await this.uploadFiles(mapFiles)
        console.log('上传成功')
      }

    })
  }
}

module.exports = UploadSourceMapPlugin
