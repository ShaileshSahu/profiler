const FileController = require('./file.controller');
const fs= require("fs");
v8Profiler.setGenerateType(1);
const title = new Date().getTime().toString();

function FileRouter(fastify,options, done) {
    fastify.get("/", async(req,res)=>{
        v8Profiler.startProfiling(title, true);
        v8Profiler.startSamplingHeapProfiling();

        const fileController = new FileController();
        const data = await fileController.readFile(res);
        const profile = v8Profiler.stopProfiling(title);
        const profileHeap = v8Profiler.stopSamplingHeapProfiling();
        profile.export(function (error, result) {
          fs.writeFileSync(`${title}.cpuprofile`, result);
          profile.delete();
        });
        fs.writeFileSync('./shf.heapprofile', JSON.stringify(profileHeap));

        return data;
        
        
    });
    done();
    
}

module.exports = FileRouter;