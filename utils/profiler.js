const v8Profiler = require('v8-profiler-next');
v8Profiler.setGenerateType(1);
const fs= require("fs");
const path = require('path');
class Profiler {
    active = process.env.ACTIVE == "TRUE" ? true: false;
    title = '';
    profile;
    constructor(title) {
        this.title = title.toString();
    }

    startProfiling(){
            v8Profiler.startProfiling(this.title,true);
    }

    stopProfiling(){
        let title = this.title;
        const profile = v8Profiler.stopProfiling(this.title);
        profile.export(function (error, result) {
            fs.writeFileSync(path.join(__dirname,`../profilelogs/cpu/${title}.cpuprofile`), result);
            profile.delete();
        });
    }

    startProfilingHeap() {
        v8Profiler.startSamplingHeapProfiling();
    }

    stopProfilingHeap() {
        const profile  = v8Profiler.stopSamplingHeapProfiling();
        fs.writeFileSync(path.join(__dirname,`../profilelogs/heap/${this.title}.heapprofile`), JSON.stringify(profile));
    }
}



module.exports = Profiler;