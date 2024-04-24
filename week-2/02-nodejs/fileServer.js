/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
    const express = require("express");
    const fs = require("fs");
    const path = require("path");
    
    const app = express();
    const PORT = 3000;
    const directoryPath = "./files"

    app.get("/files", async (req, res) => { // Make the route handler asynchronous
      try {
          // Await the completion of getFilesFromDirectory function
          const fileList = await getFilesFromDirectory(directoryPath);
          res.status(200).json(fileList);
      } catch (error) {
          res.status(500).json({ error: "Internal Server Error" });
      }
  });
  
  async function getFilesFromDirectory(directoryPath) { 
      let fileList = [];
      const items = await fs.readdir(directoryPath);
  
      for (const item of items) { // Use for...of loop for async operations
          const fullPath = path.join(directoryPath, item);
          const stats = await fs.stat(fullPath); // Await the completion of fs.stat
  
          if (stats.isFile()) {
              fileList.push(item);
          } else if (stats.isDirectory()) {
              const subFiles = await getFilesFromDirectory(fullPath); // Recursively get files from subdirectory
              fileList = fileList.concat(subFiles);
          }
      }
  
      return fileList;
  }

  
  app.get("/files/:fileName", (req, res)=>{
    const name = req.params.fileName
    const fullPath = path.join(directoryPath, name)
    
    fs.readFile(fullPath,'utf-8',(err, data)=>{
      if(err){
        res.status(404).json({
          error:"File not found"
        })
      }else{
        res.status(200).json({
          msg: data
        })
      }
    })
  })

  // for /files/dynamicdirName/dynamicfileName

  // app.get("/files/:dirName/:fileName" , (req, res)=>{
  //   const dName = req.params.dirName
  //   const name = req.params.fileName

  //   const fullPath = path.join(directoryPath,dName, name)
    
  //   fs.readFile(fullPath,'utf-8',(err, data)=>{
  //     if(err){
  //       res.status(400).json({
  //         error:"file not found"
  //       })
  //     }else{
  //       res.status(200).json({
  //         msg: data
  //       })
  //     }
  //   })
  // });

  // for all dynamic paths
  // app.get("/files/**", (req, res)=>{
  //   const dName = req.params[0]
  //   // const name = req.params.fileName
  //   // console.log(name);
  //   const fullPath = path.join(directoryPath,dName)
    
  //   fs.readFile(fullPath,'utf-8',(err, data)=>{
  //     if(err){
  //       res.status(400).json({
  //         error:"file not found"
  //       })
  //     }else{
  //       res.status(200).json({
  //         msg: data
  //       })
  //     }
  //   })
  // })
  
  app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
  });


module.exports = app;