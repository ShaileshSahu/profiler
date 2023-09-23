const FileController = require('./file.controller');
const Profiler = require('../../utils/profiler');
function FileRouter(fastify,options, done) {
    fastify.get("/", async(req,res)=>{
        
        const profiler =new Profiler('FileUploadProfile');
        profiler.startProfiling();
        profiler.startProfilingHeap();
        const fileController = new FileController();
        const data = await fileController.readFile(res);
        profiler.stopProfiling();
        profiler.stopProfilingHeap();
        return data;
    });
    done();
    
}

module.exports = FileRouter;